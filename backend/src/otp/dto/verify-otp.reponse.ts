import { Otp } from "../entities/otp.entity";

export class VerifyOtpResult {
    constructor(
        public readonly isValid: boolean,
        public readonly isExpired: boolean,
        public readonly isAlreadyUsed: boolean,
        public readonly attempts: number,
        public readonly maxAttempts: number,
        public readonly message: string,
        public readonly otpEntity?: Otp | null,
    ) {}
}