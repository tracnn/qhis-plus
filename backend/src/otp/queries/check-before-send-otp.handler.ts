import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { Otp } from '../entities/otp.entity';
import { CheckBeforeSendOtpQuery } from '../queries/check-before-send-otp.query';
import { CheckBeforeSendOtpResponse } from '../dto/check-before-send-otp.reponse';
import { Inject } from '@nestjs/common';
import { OtpRepository } from '../repositories/otp.repository';
import { OTPType, OTPStatus } from '../enums/otp.enums';
import { UserRepository } from '../../user/repositories/user.repository';

@QueryHandler(CheckBeforeSendOtpQuery)
export class CheckBeforeSendOtpHandler implements IQueryHandler<CheckBeforeSendOtpQuery> {
    constructor(
        @Inject('OtpRepository')
        private readonly otpRepo: ReturnType<typeof OtpRepository>,

        @Inject('UserRepository')
        private readonly userRepo: ReturnType<typeof UserRepository>,
        // Inject thêm repo hoặc service khác nếu cần kiểm tra blacklist, user...
    ) {}

    async execute(query: CheckBeforeSendOtpQuery): Promise<CheckBeforeSendOtpResponse> {
        const { phoneNumber, otpType } = query;

        // 1. Kiểm tra định dạng
        const isPhoneValid = /^\d{10,11}$/.test(phoneNumber);

        // 2. Kiểm tra số lượng OTP đã gửi hôm nay
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const countToday = await this.otpRepo.count({
            where: {
                phoneNumber,
                createdAt: MoreThanOrEqual(today),
            },
        });

        // 3. OTP gần nhất
        const lastOtp = await this.otpRepo.findOne({
            where: { phoneNumber, otpType: otpType as OTPType },
            order: { createdAt: 'DESC' },
        });

        // 4. Đếm số lần nhập sai OTP hôm nay (giả sử status = 'FAILED')
        const wrongOtpCountToday = await this.otpRepo.count({
            where: {
                phoneNumber,
                otpStatus: OTPStatus.FAILED,
                createdAt: MoreThanOrEqual(today),
            },
        });

        // 5. Kiểm tra user (nếu có)
        let userExists = false;
        let isUserLocked = false;
        const user = await this.userRepo.findOne({ where: { phoneNumber } });
        if (user) {
            userExists = true;
            isUserLocked = !!user.isLocked; // field isLocked: boolean
        }

        // 6. Kiểm tra blacklist
        let isBlacklisted = false;
        // isBlacklisted = await this.blacklistService.isBlacklisted(phoneNumber);

        // 7. Kiểm tra whitelist (giả lập)
        let isWhitelisted = false;
        // isWhitelisted = await this.whitelistService.isWhitelisted(phoneNumber);

        return new CheckBeforeSendOtpResponse(
            isPhoneValid,
            countToday,
            lastOtp,
            isBlacklisted,
            isWhitelisted,
            isUserLocked,
            userExists,
            wrongOtpCountToday
            // ... các trường khác nếu cần
        );
    }
}