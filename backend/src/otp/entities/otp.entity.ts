import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { OTPType, OTPStatus, OTPChannel } from '../enums/otp.enums';
import { ZALO_CONFIG } from '../../config/zalo.config';
import { Exclude } from 'class-transformer';

@Entity('OTPS')
export class Otp extends BaseEntity{

    @Column({ name: 'PHONE_NUMBER' })
    @Index()
    phoneNumber: string;

    @Exclude()
    @Column({ name: 'OTP_CODE' })
    otpCode: string;

    @Column({ name: 'OTP_TYPE'})
    @Index()
    otpType: OTPType;

    @Column({ name: 'OTP_CHANNEL', nullable: true })
    otpChannel: OTPChannel;

    @Exclude()
    @Column({ name: 'OTP_STATUS', default: OTPStatus.PENDING })
    otpStatus: OTPStatus;

    @Column({ name: 'EXPIRES_AT' })
    expiresAt: Date;

    @Column({ name: 'ATTEMPTS', default: 0 })
    attempts: number;

    @Column({ name: 'MAX_ATTEMPTS', default: ZALO_CONFIG.ZALO_MAX_ATTEMPTS })
    maxAttempts: number;
} 