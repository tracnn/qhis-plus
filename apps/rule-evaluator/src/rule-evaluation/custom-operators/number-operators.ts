import { OperatorEvaluator } from 'json-rules-engine';

export const numberOperators: Record<string, OperatorEvaluator<any, any>> = {
    // Kiểm tra xem tuổi của bệnh nhân có nằm trong khoảng tuổi nhất định không
    ageBetween: (factValue: number, jsonValue: { min: number; max: number }) => {
        return factValue >= jsonValue.min && factValue <= jsonValue.max;
    },

    // Kiểm tra xem giá trị đường huyết có nằm trong phạm vi an toàn không
    bloodSugarLevelSafe: (factValue: number, jsonValue: { min: number; max: number }) => {
        return factValue >= jsonValue.min && factValue <= jsonValue.max;
    },

    // Kiểm tra xem chỉ số BMI của bệnh nhân có nằm trong phạm vi bình thường không
    bmiSafe: (factValue: number) => {
        return factValue >= 18.5 && factValue <= 24.9;
    },

    // Kiểm tra xem liều dùng thuốc có nằm trong phạm vi an toàn không
    dosageSafe: (factValue: number, jsonValue: { min: number; max: number }) => {
        return factValue >= jsonValue.min && factValue <= jsonValue.max;
    },

    // Kiểm tra nếu số nằm trong khoảng
    between: (factValue: number, jsonValue: { min: number; max: number }) => {
        return factValue >= jsonValue.min && factValue <= jsonValue.max;
        },

    // Kiểm tra nếu số vượt quá giá trị tối đa
    exceedsMax: (factValue: number, jsonValue: number) => {
        return factValue > jsonValue;
    },

    // Kiểm tra nếu số nhỏ hơn giá trị tối thiểu
    belowMin: (factValue: number, jsonValue: number) => {
        return factValue < jsonValue;
    },

    // Kiểm tra nếu giá trị nhịp tim trong phạm vi an toàn
    heartRateSafe: (factValue: number, jsonValue: { min: number; max: number }) => {
        return factValue >= jsonValue.min && factValue <= jsonValue.max;
    }
};