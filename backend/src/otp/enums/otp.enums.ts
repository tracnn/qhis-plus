export enum OTPType {
    REGISTER = 'REGISTER',         // OTP cho khởi tạo tài khoản
    ACTIVATE = 'ACTIVATE',         // OTP xác thực kích hoạt tài khoản
    RESEND_ACTIVATE = 'RESEND_ACTIVATE', // OTP gửi lại xác thực kích hoạt tài khoản
    FORGOT_PASSWORD = 'FORGOT_PASSWORD', // OTP quên mật khẩu
    CHANGE_PASSWORD = 'CHANGE_PASSWORD',  // OTP đổi mật khẩu
    CHANGE_EMAIL = 'CHANGE_EMAIL',        // OTP đổi email
    CHANGE_PHONE = 'CHANGE_PHONE',        // OTP đổi số điện thoại
    UPDATE_PASSWORD = 'UPDATE_PASSWORD',  // OTP đổi mật khẩu
    // ...bổ sung loại nghiệp vụ khác nếu cần
}

export enum OTPChannel {
    SMS = 'SMS',
    ZALO = 'ZALO',
    EMAIL = 'EMAIL',
    // ...thêm các kênh khác nếu cần
}

export enum OTPStatus {
    PENDING = 'PENDING',
    VERIFIED = 'VERIFIED',
    EXPIRED = 'EXPIRED',
    BLOCKED = 'BLOCKED',
    FAILED = 'FAILED'
}