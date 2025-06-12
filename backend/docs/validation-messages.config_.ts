export const VALIDATION_MESSAGES = {
    IS_STRING: 'Giá trị phải là chuỗi ký tự.',
    IS_NOT_EMPTY: 'Giá trị không được để trống.',
    LENGTH: (min?: number, max?: number) => {
        if (min && max && min === max) return `Độ dài phải là ${min} ký tự.`;
        if (min && max) return `Độ dài phải từ ${min} đến ${max} ký tự.`;
        if (min) return `Độ dài phải ít nhất là ${min} ký tự.`;
        if (max) return `Độ dài phải tối đa là ${max} ký tự.`;
        return 'Độ dài không hợp lệ.';
    },
    MATCHES: (pattern: string) => 'Sai định dạng. Kiểm tra lại định dạng.',
    IS_NUMBER: 'Giá trị phải là số.',
    IS_EMAIL: 'Giá trị phải là email hợp lệ.',
    IS_DATE: 'Giá trị phải là ngày tháng hợp lệ.',
    IS_BOOLEAN: 'Giá trị phải là kiểu boolean.',
    IS_ARRAY: 'Giá trị phải là mảng.',
};