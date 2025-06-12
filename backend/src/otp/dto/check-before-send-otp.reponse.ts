export class CheckBeforeSendOtpResponse {
    constructor(
        public readonly isPhoneValid: boolean,
        public readonly countToday: number,
        public readonly lastOtp: any | null, // hoặc kiểu OtpEntity
        public readonly isBlacklisted: boolean,
        public readonly isWhitelisted: boolean,
        public readonly isUserLocked: boolean,
        public readonly userExists: boolean,
        public readonly wrongOtpCountToday: number,
        // ... các trường khác nếu cần
    ) {}
}