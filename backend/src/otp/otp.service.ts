import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateOtpDto } from './dto/create-otp.dto';
import { OtpResponseDto } from './dto/otp-response.dto';
import { OTPChannel, OTPType } from './enums/otp.enums';
import { CheckBeforeSendOtpQuery } from './queries/check-before-send-otp.query';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { CreateOtpQuery } from './commands/create-otp.command';
import { plainToInstance } from 'class-transformer';
import { ZALO_CONFIG } from 'src/config/zalo.config';
import { VerifyOtpQuery } from './queries/verify-otp.query';
import { UpdateOtpCommand } from './commands/otp-update.command';
import { UpdateUserActiveStatusCommand } from '@user/commands/update-user-active-status.command';
import { ApiException } from '@common/api.exception';
import { ConfirmRegMessage } from './dto/zalo-message.dto';
import { ZaloService } from './services/zalo.service';
import { ERRORS } from '../common/errors.config';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_404 } from '@common/error-messages/error-404';
import { ERROR_403 } from '@common/error-messages/error-403';
import { SmsService } from './services/sms.service';

@Injectable()
export class OtpService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        @InjectQueue('otp-queue') private readonly otpQueue: Queue,
        private readonly zaloService: ZaloService,
        private readonly smsService: SmsService,
        @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>
    ) {}

    async requestOtp(phone: string, zalo_user_id?: string, otp?: string): Promise<any> {
        return await this.otpQueue.add({
            phone,
            zalo_user_id,
            otp,
        });
    }

    async verifyOtp(phoneNumber: string, otpCode: string, otpType: OTPType) {
        const result = await this.queryBus.execute<VerifyOtpQuery, any>(
            new VerifyOtpQuery(phoneNumber, otpCode, otpType)
        );

        await this.commandBus.execute(new UpdateOtpCommand({
            phoneNumber: phoneNumber,
            otpType: otpType,
            isSuccess: result.isValid && !result.isExpired && !result.isAlreadyUsed,
        }));

        // Tùy xử lý: Nếu hợp lệ thì cập nhật status, nếu sai thì tăng attempts
        if (!result.isValid || result.isExpired || result.isAlreadyUsed || result.attempts >= result.maxAttempts) {
            throw new ForbiddenException(ERROR_403.FORBIDDEN_OTP_WRONG_OTP);
        }
        
        switch (otpType) {
            case OTPType.REGISTER:
            case OTPType.ACTIVATE:
            case OTPType.RESEND_ACTIVATE:
                // Kích hoạt user mới tạo tài khoản
                break;
            case OTPType.FORGOT_PASSWORD:
                // Cho phép user đổi mật khẩu, có thể trả về một token đặc biệt
                break;
            case OTPType.CHANGE_EMAIL:
                // Xác thực đổi email cho user
                break;
            case OTPType.CHANGE_PHONE:
                // Xác thực đổi số điện thoại
                break;
            case OTPType.UPDATE_PASSWORD:
                // Xác thực đổi mật khẩu
                break;
            // Các trường hợp khác...
            default:
                // Nếu là loại chưa định nghĩa, xử lý hoặc báo lỗi
                throw new ApiException('UNKNOWN_OTP_TYPE');
        }
    }

    async createOtp(createOtpDto: CreateOtpDto): Promise<OtpResponseDto> {
        const { phoneNumber, otpType } = createOtpDto;

        const check = await this.queryBus.execute<CheckBeforeSendOtpQuery, any>(
            new CheckBeforeSendOtpQuery(phoneNumber, otpType)
        );
        
        if (check.countToday >= ZALO_CONFIG.ZALO_MAX_OTP_PER_DAY) {
            throw new ForbiddenException(ERROR_403.FORBIDDEN_OTP_MAX_PER_DAY);
        }

        if (check.isBlacklisted) {
            throw new ForbiddenException(ERROR_403.FORBIDDEN_OTP_BLACKLISTED);
        }

        if (check.isUserLocked) {
            throw new ForbiddenException(ERROR_403.FORBIDDEN_OTP_LOCKED);
        }

        if (check.wrongOtpCountToday >= ZALO_CONFIG.ZALO_MAX_WRONG_OTP_PER_DAY) {
            throw new ForbiddenException(ERROR_403.FORBIDDEN_OTP_WRONG_OTP_COUNT_TODAY);
        }
        
        if (check.lastOtp && !this.isOtpExpired(check.lastOtp) && !check.lastOtp.isVerified) {
            const timeLeft = Math.ceil((check.lastOtp.expiresAt - new Date().getTime()) / 1000);
            const message = { message: `Bạn đã gửi OTP trước đó, vui lòng chờ ${timeLeft} giây để gửi lại` };
            throw new ForbiddenException(message);
        }

        return plainToInstance(OtpResponseDto, this.commandBus.execute(new CreateOtpQuery(createOtpDto)));
    }

    async sendOTPRegister(dto: ConfirmRegMessage) {
        
        //1. Send OTP by Zalo
        const zaloResult = await this.zaloService.sendMessageConfirmReg(dto);

        const now = Date.now();
        const expiresAt = new Date(dto.expiresAt).getTime();
        const expireIn = Math.max(0, Math.ceil((expiresAt - now) / 1000));
        
        if (zaloResult.error < 400) {
            const resultData = {
                status: zaloResult.status,
                message: zaloResult.message,
                otpChannel: OTPChannel.ZALO,
                expireIn: expireIn
            }

            return resultData;
        }

        //2. Send OTP by SMS
        if (zaloResult.status > 400) {
            const smsResult = await this.smsService.sendMessage({
                phoneNumber: dto.phone,
                functionCode: 'OTP_REGISTER',
                parameters: [dto.otp || '']
            });
            if (smsResult === 'success') {
                const otpChannel = OTPChannel.SMS;
                const data = {
                    status: 'success',
                    message: 'Gửi OTP tới SMS thành công',
                    otpChannel: otpChannel,
                    expireIn: expireIn
                }
                return {
                    data: data
                };
            } else {
                throw new ForbiddenException(smsResult);
            }
        }

        //3. Failed
        const data = {
            status: 'error',
            message: 'Gửi OTP tới Zalo và SMS thất bại',
            otpChannel: OTPChannel.ZALO,
            expireIn: expireIn
        }
        return {
            data: data
        };
    }

    private isOtpExpired(otp: any): boolean {
        return new Date(otp.expiresAt) < new Date();
    }

    async findAll() {
        return this.otpRepository.find();
    }

    async findOne(id: string) {
        return this.otpRepository.findOne({ where: { id } });
    }

    async delete(id: string) {
        return this.otpRepository.delete(id);
    }
}
