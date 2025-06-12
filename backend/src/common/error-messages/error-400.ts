// BadRequestException
export const ERROR_400 = {
    INVALID_REQUEST: { message: 'Yêu cầu không hợp lệ' },
    INVALID_REQUEST_BODY: { message: 'Nội dung yêu cầu không hợp lệ' },
    INVALID_REQUEST_PARAM: { message: 'Tham số yêu cầu không hợp lệ' },
    INVALID_REQUEST_QUERY: { message: 'Tham số yêu cầu không hợp lệ' },
    PASSWORD_NOT_MATCH: { message: 'Mật khẩu không khớp' },
    OLD_PASSWORD_NOT_MATCH: { message: 'Mật khẩu cũ không đúng' },
    NEW_PASSWORD_NOT_MATCH: { message: 'Mật khẩu mới và xác nhận mật khẩu không khớp' },
    INVALID_TARGET_USER_AND_FAMILY_MEMBER: { message: 'Không được cùng lúc có cả chủ tài khoản và thành viên' },
}