import { OperatorEvaluator } from 'json-rules-engine';

export const medicalCustomOperators: Record<string, OperatorEvaluator<any, any>> = {
    // Kiểm tra xem tuổi của bệnh nhân có nằm trong khoảng tuổi nhất định không
    ageBetween: (factValue: number, jsonValue: { min: number; max: number }) => {
        return factValue >= jsonValue.min && factValue <= jsonValue.max;
    },

    // Kiểm tra xem mã ICD-10 có đúng định dạng không
    isValidICD10: (factValue: string) => {
        const icd10Regex = /^[A-Z][0-9]{2}(\.[0-9A-Z]{1,4})?$/;
        return icd10Regex.test(factValue);
    },

    // Kiểm tra xem giá trị đường huyết có nằm trong phạm vi an toàn không
    bloodSugarLevelSafe: (factValue: number, jsonValue: { min: number; max: number }) => {
        return factValue >= jsonValue.min && factValue <= jsonValue.max;
    },

    // Kiểm tra xem chỉ số huyết áp có nằm trong phạm vi an toàn không
    bloodPressureSafe: (factValue: { systolic: number; diastolic: number }, jsonValue: { minSystolic: number; maxSystolic: number, minDiastolic: number, maxDiastolic: number }) => {
        return (
            factValue.systolic >= jsonValue.minSystolic &&
            factValue.systolic <= jsonValue.maxSystolic &&
            factValue.diastolic >= jsonValue.minDiastolic &&
            factValue.diastolic <= jsonValue.maxDiastolic
        );
    },

    // Kiểm tra xem bệnh nhân có thuộc nhóm đối tượng nguy cơ (như trẻ em, người già, phụ nữ mang thai)
    isHighRiskPatient: (factValue: string, jsonValue: string[]) => {
        return jsonValue.includes(factValue);
    },

    // Kiểm tra xem chỉ số BMI của bệnh nhân có nằm trong phạm vi bình thường không
    bmiSafe: (factValue: number) => {
        return factValue >= 18.5 && factValue <= 24.9;
    },

    // Kiểm tra xem bệnh nhân có dị ứng với một loại thuốc nhất định không
    hasAllergy: (factValue: string[], jsonValue: string) => {
        return factValue.includes(jsonValue);
    },

    // Kiểm tra xem thuốc có tương tác với nhau không
    hasDrugInteraction: (factValue: string[], jsonValue: { drug1: string, drug2: string }) => {
        return factValue.includes(jsonValue.drug1) && factValue.includes(jsonValue.drug2);
    },

    // Kiểm tra xem lịch sử bệnh của bệnh nhân có chứa bệnh nền cụ thể không
    hasChronicDisease: (factValue: string[], jsonValue: string) => {
        return factValue.includes(jsonValue);
    },

    // Kiểm tra xem liều dùng thuốc có nằm trong phạm vi an toàn không
    dosageSafe: (factValue: number, jsonValue: { min: number, max: number }) => {
        return factValue >= jsonValue.min && factValue <= jsonValue.max;
    },

    // Kiểm tra xem bệnh nhân có sử dụng thuốc trong danh sách cấm hay không
    isForbiddenDrug: (factValue: string[], jsonValue: string[]) => {
        return factValue.some(drug => jsonValue.includes(drug));
    },

    // Kiểm tra xem bệnh nhân có được điều trị tại đúng khoa chuyên môn không
    correctDepartment: (factValue: string, jsonValue: string[]) => {
        return jsonValue.includes(factValue);
    },

    // Kiểm tra xem bệnh nhân có lịch sử phẫu thuật trong vòng 1 năm không
    recentSurgery: (factValue: string, jsonValue: { months: number }) => {
        const surgeryDate = new Date(factValue);
        const now = new Date();
        const difference = (now.getTime() - surgeryDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
        return difference <= jsonValue.months;
    }
};