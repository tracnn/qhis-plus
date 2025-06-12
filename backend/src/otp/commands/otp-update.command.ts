import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { OtpRepository } from '../repositories/otp.repository';
import { OTPStatus, OTPType } from '../enums/otp.enums';
import { MoreThan } from 'typeorm';
import * as moment from 'moment';

export class UpdateOtpDto {
    phoneNumber: string;
    otpType: OTPType;
    isSuccess: boolean; // true = xác nhận thành công, false = nhập sai
}

// Command
export class UpdateOtpCommand {
    constructor(public readonly dto: UpdateOtpDto) {}
}

@CommandHandler(UpdateOtpCommand)
export class UpdateOtpHandler implements ICommandHandler<UpdateOtpCommand> {
    constructor(
        @Inject('OtpRepository')
        private readonly otpRepo: ReturnType<typeof OtpRepository>,
    ) {}

    async execute(command: UpdateOtpCommand): Promise<any> {
        const { phoneNumber, isSuccess, otpType } = command.dto;
        const now = moment().toDate();

        const otp = await this.otpRepo.findOne({
          where: {
            phoneNumber,
            otpType: otpType as OTPType,
            otpStatus: OTPStatus.PENDING,
            expiresAt: MoreThan(now), // Chỉ lấy OTP chưa hết hạn
          },
          order: { createdAt: 'DESC' },
        });
        
        if (!otp) return null;
       
        if (isSuccess) {
            otp.attempts += 1;
            otp.otpStatus = OTPStatus.VERIFIED;
        } else {
            if (otp.attempts >= otp.maxAttempts) {
                otp.otpStatus = OTPStatus.FAILED;
            }
        }
        return await this.otpRepo.save(otp);
    }
}