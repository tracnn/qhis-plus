import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { VerifyOtpQuery } from './verify-otp.query';
import { VerifyOtpResult } from '../dto/verify-otp.reponse';
import { OTPStatus, OTPType } from '../enums/otp.enums';
import { Inject } from '@nestjs/common';
import { OtpRepository } from '../repositories/otp.repository';

@QueryHandler(VerifyOtpQuery)
export class VerifyOtpHandler implements IQueryHandler<VerifyOtpQuery> {
    constructor(
        @Inject('OtpRepository')
        private readonly otpRepo: ReturnType<typeof OtpRepository>,
    ) {}

    async execute(query: VerifyOtpQuery): Promise<VerifyOtpResult> {
        const { phoneNumber, otpCode, otpType } = query;

        // Tìm OTP gần nhất (trạng thái PENDING, chưa hết hạn, đúng code)
        const otp = await this.otpRepo.findOne({
            where: {
                phoneNumber,
                otpCode,
                otpType: otpType as OTPType,
                otpStatus: OTPStatus.PENDING,
            },
            order: { createdAt: 'DESC' },
        });

        if (!otp) {
            return new VerifyOtpResult(false, false, false, 0, 0, 'OTP không đúng hoặc đã hết hạn');
        }

        // Kiểm tra OTP hết hạn chưa
        const now = new Date();
        const isExpired = new Date(otp.expiresAt) < now;

        if (isExpired) {
            return new VerifyOtpResult(false, true, false, otp.attempts, otp.maxAttempts, 'OTP đã hết hạn', otp);
        }

        // Kiểm tra đã dùng chưa (tùy hệ thống lưu trạng thái)
        const isAlreadyUsed = otp.otpStatus === OTPStatus.VERIFIED;

        if (isAlreadyUsed) {
            return new VerifyOtpResult(false, false, true, otp.attempts, otp.maxAttempts, 'OTP đã được sử dụng', otp);
        }

        // Đếm số lần nhập sai nếu cần kiểm soát
        if (otp.attempts >= otp.maxAttempts) {
            return new VerifyOtpResult(false, false, false, otp.attempts, otp.maxAttempts, 'Bạn đã nhập sai quá số lần cho phép', otp);
        }

        // Nếu qua hết, hợp lệ!
        return new VerifyOtpResult(true, false, false, otp.attempts, otp.maxAttempts, 'OTP hợp lệ', otp);
    }
}