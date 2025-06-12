export class VerifyOtpQuery {
    constructor(
        public readonly phoneNumber: string,
        public readonly otpCode: string,
        public readonly otpType: string, // có thể mặc định 'ZALO' nếu hệ thống chỉ có 1 loại
    ) {}
}