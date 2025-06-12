export enum SupportRequestType {
    RESULT_REQUEST = 'RESULT_REQUEST',
    INFO_UPDATE = 'INFO_UPDATE',
    TECHNICAL_SUPPORT = 'TECHNICAL_SUPPORT',
    OTHER = 'OTHER',
}

export enum SupportRequestStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

export const SUPPORT_REQUEST_TYPE_LIST = [
    { value: SupportRequestType.RESULT_REQUEST, label: 'Yêu cầu trả kết quả' },
    { value: SupportRequestType.INFO_UPDATE, label: 'Thay đổi thông tin hành chính' },
    { value: SupportRequestType.TECHNICAL_SUPPORT, label: 'Hỗ trợ kỹ thuật' },
    { value: SupportRequestType.OTHER, label: 'Khác' },
];