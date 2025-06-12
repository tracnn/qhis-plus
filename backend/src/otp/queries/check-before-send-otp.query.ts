export class CheckBeforeSendOtpQuery {
    constructor(
        public readonly phoneNumber: string,
        public readonly otpType: string,
    ) {}
}