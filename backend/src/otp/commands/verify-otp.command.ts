import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { OtpRepository } from '../repositories/otp.repository';
import { VerifyOTPDto } from '../dto/verify-otp.dto';
import { OTPStatus } from '../enums/otp.enums';

export class VerifyOTPCommand {
    constructor(public readonly dto: VerifyOTPDto) {}
}

@Injectable()
@CommandHandler(VerifyOTPCommand)
export class VerifyOTPHandler implements ICommandHandler<VerifyOTPCommand> {
    constructor(
        @Inject('OtpRepository')
        private readonly otpRepository: ReturnType<typeof OtpRepository>
    ) {}

    async execute(command: VerifyOTPCommand): Promise<boolean> {
        const { phoneNumber, otpCode, otpType } = command.dto;

        // Find active OTP for the phone number
        const activeOtps = await this.otpRepository.findByPhoneNumber(phoneNumber);
        if (!activeOtps) {
            throw new UnauthorizedException('No active OTP found');
        }

        const otp = activeOtps; // Get the most recent OTP

        return true;
    }
} 