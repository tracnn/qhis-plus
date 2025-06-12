export enum SatisfactionSurveyType {
    TREATMENT = 'TREATMENT',     // Đánh giá toàn hồ sơ điều trị
    SERVICE = 'SERVICE',         // Đánh giá từng dịch vụ cụ thể
}

export enum SatisfactionSurveyStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}