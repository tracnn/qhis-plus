import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { ERRORS } from '../common/errors.config';
import { QueryBus } from '@nestjs/cqrs';
import { CommandBus } from '@nestjs/cqrs';
import { CheckDuplicateUsernameQuery } from './queries/check-duplicate-username.query';
import { CheckDuplicateIdentityNumberQuery } from './queries/check-duplicate-identity-number.query';
import { CheckDuplicateInsuranceNumberQuery } from './queries/check-duplicate-insurance-number.query';
import { CheckHealthInsuranceQuery } from './queries/check-health-insurance.query';
import { CreateUserCommand } from './commands/create-user.command';
import { AddressLocationResolverService } from './services/address-location-resolver.service';
import { GetUsersQuery } from './queries/impl/get-users.query';
import { GetUsersDto } from './dto/get-users.dto';
import { GetUserQuery } from './queries/impl/get-user.query';
import { OtpService } from '../otp/otp.service';
import { OTPType } from '../otp/enums/otp.enums';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { redisClient } from 'src/redis/redis.provider';
import { REDIS_CONFIG } from 'src/config/redis.config';
import { UserRepository } from './repositories/user.repository';
import { UpdatePasswordWithOtpDto } from './dto/update-password-with-otp-dto';
import { UpdatePasswordWithOtpCommand } from './commands/update-password-with-otp.command';
import { RequestUpdatePasswordOtpDto } from './dto/request-update-password-otp.dto';
import { AuthService } from '../auth/auth.service';
import { CheckDuplicatePhoneNumberQuery } from './queries/check-duplicate-phone-number.query';
import { ERROR_409 } from '../common/error-messages/error-409';
import { ERROR_400 } from '../common/error-messages/error-400';
import { ERROR_404 } from '../common/error-messages/error-404';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangePasswordCommand } from './commands/change-password.command';

@Injectable()
export class UserService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly addressLocationResolverService: AddressLocationResolverService,
        private readonly otpService: OtpService,
        @Inject('UserRepository')
        private readonly userRepository: ReturnType<typeof UserRepository>,
        private readonly authService: AuthService,
    ) {}

    async canCreate(validateDto: ValidateUserDto) {

        // 1. Kiểm tra trùng số CCCD/identityNumber bằng QueryBus
        const isIdentityNumberDuplicate = await this.queryBus.execute(
            new CheckDuplicateIdentityNumberQuery(validateDto.identityNumber)
        );

        if (isIdentityNumberDuplicate) {
            throw new ConflictException({ ...ERROR_409.CONFLICT_IDENTITY_NUMBER });
        }

        //2. Kiểm tra trùng số điện thoại
        const isPhoneNumberDuplicate = await this.queryBus.execute(
            new CheckDuplicatePhoneNumberQuery(validateDto.phoneNumber)
        );
        if (isPhoneNumberDuplicate) {
            throw new ConflictException({ ...ERROR_409.CONFLICT_PHONE });
        }

        // 2. Kiểm tra BHYT bằng QueryBus (nếu đã có handler)
        const healthInsurance = await this.queryBus.execute(new CheckHealthInsuranceQuery(validateDto));
        const address = healthInsurance.address;
        
        if (!address) {
            return { ...healthInsurance }
        }

        const addressLocation = await this.addressLocationResolverService.resolve(address);

        return {
            ...healthInsurance,
            ...addressLocation,
            phoneNumber: validateDto.phoneNumber
        }

    }

    async create(createUserDto: CreateUserDto): Promise<any> {       
        // 0. Check trùng số điện thoại
        const isPhoneNumberDuplicate = await this.queryBus.execute(
            new CheckDuplicatePhoneNumberQuery(createUserDto.phoneNumber)
        );
        if (isPhoneNumberDuplicate) {
            throw new ConflictException({ ...ERROR_409.CONFLICT_PHONE });
        }
        // 1. Check trùng username
        if (createUserDto.username) {
            const isUsernameDuplicate = await this.queryBus.execute(
                new CheckDuplicateUsernameQuery(createUserDto.username)
            );
            if (isUsernameDuplicate) {
                throw new ConflictException({ ...ERROR_409.CONFLICT_USERNAME});
            }
        }

        // 2. Check trùng số CCCD
        if (createUserDto.identityNumber) {
            const isIdentityDuplicate = await this.queryBus.execute(
                new CheckDuplicateIdentityNumberQuery(createUserDto.identityNumber)
            );
            if (isIdentityDuplicate) {
                throw new ConflictException({ ...ERROR_409.CONFLICT_IDENTITY_NUMBER});
            }
        }

        // 3. Check trùng số BHYT
        if (createUserDto.insuranceNumber) {
            const isInsuranceDuplicate = await this.queryBus.execute(
                new CheckDuplicateInsuranceNumberQuery(createUserDto.insuranceNumber)
            );
            if (isInsuranceDuplicate) {
                throw new ConflictException({ ...ERROR_409.CONFLICT_INSURANCE_NUMBER});
            }
        }


        // 3. Kiểm tra thông tin BHXH
        const healthInsurance = await this.queryBus.execute(new CheckHealthInsuranceQuery(createUserDto));
        if (healthInsurance.fullName === null) {
            throw new BadRequestException({ ...ERROR_400.INVALID_REQUEST});
        }
        
        // Bổ sung kiểm tra tồn tại user tạm trong Redis
        const check_key_register = `register:${createUserDto.phoneNumber}`;
        const existed = await redisClient.get(check_key_register);
        if (existed) {
            throw new BadRequestException({ ...ERROR_400.INVALID_REQUEST});
        }

        // 4. Tạo user (Bỏ qua bước tạo user ở đây để đẩy user tạm vào redis)
        // const user = await this.commandBus.execute(new CreateUserCommand(createUserDto));

        const otpResult = await this.otpService.createOtp({
            phoneNumber: createUserDto.phoneNumber,
            otpType: OTPType.REGISTER
        });

        const key = `register:${createUserDto.phoneNumber}`;
        await redisClient.set(key, JSON.stringify(createUserDto), 'EX', REDIS_CONFIG.REGISTER_TTL);
        
        await this.otpService.sendOTPRegister({
            phone: createUserDto.phoneNumber,
            otp: otpResult.otpCode,
            expiresAt: otpResult.expiresAt
        });

        return {
            ...plainToInstance(UserResponseDto, createUserDto),
        };
    }

    async findAll(query: GetUsersDto) {
        return await this.queryBus.execute(new GetUsersQuery(query.page, query.limit));
    }

    async findOne(id: string) {
        return await this.queryBus.execute(new GetUserQuery(id));
    }

    async verifyRegisterOtp(phoneNumber: string, otp: string) {
        // 1. Xác thực OTP đúng loại REGISTER (nếu sai sẽ ném lỗi luôn)
        await this.otpService.verifyOtp(phoneNumber, otp, OTPType.REGISTER);
    
        // 2. Lấy thông tin đăng ký tạm thời từ Redis
        const key = `register:${phoneNumber}`;
        const regInfoStr = await redisClient.get(key);
        if (!regInfoStr) {
          throw new BadRequestException( ERROR_400.INVALID_REQUEST );
        }
        const regInfo: CreateUserDto = JSON.parse(regInfoStr);
    
        // 3. Kiểm tra lại user thật trong DB (tránh trường hợp đăng ký 2 lần)
        const existed = await this.queryBus.execute(new CheckDuplicateUsernameQuery(regInfo.username));
        if (existed) {
          throw new ConflictException( ERROR_409.CONFLICT_USERNAME );
        }
    
        // 4. Tạo user thật trong database (hash password)
        const user = await this.commandBus.execute(new CreateUserCommand(regInfo));
    
        // 5. Xóa thông tin tạm trong Redis (cả OTP và info)
        await redisClient.del(`register:${phoneNumber}`);
    
        // 6. Trả về kết quả
        return {
          ...plainToInstance(UserResponseDto, user),
        };
    }

    async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
        return await this.commandBus.execute(new ChangePasswordCommand(userId, changePasswordDto));
    }

    async findByPhoneAndUsername(phoneNumber: string, username: string) {
        return await this.userRepository.findByPhoneAndUsername(phoneNumber, username);
    }

    async findByPhoneAndCCCD(phoneNumber: string, identityNumber: string) {
        return await this.userRepository.findByPhoneAndIdentityNumber(phoneNumber, identityNumber);
    }

    async updatePassword(userId: string, newPassword: string) {
        return await this.userRepository.updatePassword(userId, newPassword);
    }

    async updatePasswordWithOtp(body: UpdatePasswordWithOtpDto) {
        return await this.commandBus.execute(new UpdatePasswordWithOtpCommand(body));
    }

    async requestUpdatePasswordOtp(dto: RequestUpdatePasswordOtpDto): Promise<any> {
        const { phoneNumber, identity, newPassword, confirmNewPassword } = dto;

        if (newPassword !== confirmNewPassword) {
            throw new NotFoundException( ERROR_400.PASSWORD_NOT_MATCH );
        }

        // 1. Kiểm tra user tồn tại
        let user = null;
        if (/^\d{9,12}$/.test(identity)) {
          user = await this.findByPhoneAndCCCD(phoneNumber, identity);
        } else {
          user = await this.findByPhoneAndUsername(phoneNumber, identity);
        }
        // Không trả lỗi chi tiết để tránh dò user
        if (!user) {
          throw new NotFoundException( ERROR_404.USER_WITH_INFORMATION_NOT_FOUND );
        }
    
        // 2. Gọi OtpService gửi OTP
        const otpResult = await this.otpService.createOtp({
            phoneNumber: dto.phoneNumber,
            otpType: OTPType.UPDATE_PASSWORD
        });

        const hashedPassword = await this.authService.hashPassword(dto.newPassword);

        const key = `update-password:${dto.phoneNumber}:${dto.identity}:${OTPType.UPDATE_PASSWORD}`;
        await redisClient.set(key, JSON.stringify({
            hashedPassword,
        }), 'EX', REDIS_CONFIG.PASSWORD_TTL);

        if (otpResult) {
            return await this.otpService.sendOTPRegister({
                phone: dto.phoneNumber,
                otp: otpResult.otpCode,
                expiresAt: otpResult.expiresAt
            });
        }
    }

    async deleteUser(userId: string) {
        return await this.userRepository.delete(userId);
    }
}
