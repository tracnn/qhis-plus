import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { OtpRepository } from '../repositories/otp.repository';
import { CreateOtpDto } from '../dto/create-otp.dto';
import { Otp } from '../entities/otp.entity';
import { addMinutes } from 'date-fns';
import { OTPStatus, OTPType } from '../enums/otp.enums';
import { OtpService } from '../otp.service';
import { OtpResponseDto } from '../dto/otp-response.dto';
import { plainToInstance } from 'class-transformer';
import { ZALO_CONFIG } from '../../config/zalo.config';
export class CreateOtpQuery {
    constructor(public readonly dto: CreateOtpDto) {}
}

@Injectable()
@CommandHandler(CreateOtpQuery)
export class CreateOtpHandler implements ICommandHandler<CreateOtpQuery> {
    constructor(
        @Inject('OtpRepository')
        private readonly otpRepository: ReturnType<typeof OtpRepository>, 
        //private readonly otpService: OtpService
    ) {}

    async execute(query: CreateOtpQuery): Promise<any> {
        const { phoneNumber, otpType } = query.dto;

        // Generate 6-digit OTP
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Create OTP entity
        const otp = await this.otpRepository.create({
            phoneNumber,
            otpType,
            otpCode: code,
            otpStatus: OTPStatus.PENDING,
            expiresAt: addMinutes(new Date(), ZALO_CONFIG.ZALO_EXPIRATION_TIME), // OTP expires in 5 minutes
            attempts: 0,
            maxAttempts: ZALO_CONFIG.ZALO_MAX_ATTEMPTS
        });

        return await this.otpRepository.save(otp);

        // TODO: Send OTP via SMS or Zalo based on otpType
        // This would be handled by an external service
        //return await this.otpService.requestOtp(phoneNumber, otpType, code);
    }
} 