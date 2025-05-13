import { OperatorEvaluator } from 'json-rules-engine';

export const arrayOperators: Record<string, OperatorEvaluator<any, any>> = {
    // Kiểm tra xem bệnh nhân có dị ứng với một loại thuốc nhất định không
    hasAllergy: (factValue: string[], jsonValue: string) => {
        return factValue.includes(jsonValue);
    },

    // Kiểm tra xem thuốc có tương tác với nhau không
    hasDrugInteraction: (factValue: string[], jsonValue: { drug1: string, drug2: string }) => {
        return factValue.includes(jsonValue.drug1) && factValue.includes(jsonValue.drug2);
    },

    // Kiểm tra xem bệnh nhân có sử dụng thuốc trong danh sách cấm hay không
    isForbiddenDrug: (factValue: string[], jsonValue: string[]) => {
        return factValue.some(drug => jsonValue.includes(drug));
    },

    // Kiểm tra xem lịch sử bệnh của bệnh nhân có chứa bệnh nền cụ thể không
    hasChronicDisease: (factValue: string[], jsonValue: string) => {
        return factValue.includes(jsonValue);
    },
    // Kiểm tra nếu mảng chứa giá trị cụ thể
    includes: (factValue: any[], jsonValue: any) => {
        return factValue.includes(jsonValue);
    },

    // Kiểm tra nếu mảng không chứa giá trị cụ thể
    excludes: (factValue: any[], jsonValue: any) => {
        return !factValue.includes(jsonValue);
    },

    // Kiểm tra nếu mảng chứa tất cả giá trị trong danh sách
    includesAll: (factValue: any[], jsonValue: any[]) => {
        return jsonValue.every(value => factValue.includes(value));
    },

    // Kiểm tra nếu mảng trống
    isEmptyArray: (factValue: any[]) => {
        return factValue.length === 0;
    },

    // Kiểm tra nếu mảng có kích thước cụ thể
    arraySize: (factValue: any[], jsonValue: number) => {
        return factValue.length === jsonValue;
    },
    // Kiểm tra nếu ngày trước ngày hiện tại
    dateBeforeNow: (factValue: string) => {
        return new Date(factValue) < new Date();
    },

    // Kiểm tra nếu ngày sau ngày hiện tại
    dateAfterNow: (factValue: string) => {
        return new Date(factValue) > new Date();
    },

    // Kiểm tra nếu ngày nằm trong khoảng
    dateBetween: (factValue: string, jsonValue: { start: string, end: string }) => {
        const date = new Date(factValue);
        return date >= new Date(jsonValue.start) && date <= new Date(jsonValue.end);
    },

    // Kiểm tra nếu ngày là cuối tuần
    isWeekend: (factValue: string) => {
        const day = new Date(factValue).getDay();
        return day === 0 || day === 6;
    },
    
    // Kiểm tra nếu danh sách thuốc có ít nhất 2 thuốc trong danh sách tương tác nguy hiểm
    hasDangerousDrugInteractions: (factValue: string[], jsonValue: string[]) => {
        const dangerousDrugs = jsonValue.filter(drug => factValue.includes(drug));
        return dangerousDrugs.length >= 2; // Có ít nhất 2 thuốc tương tác
    }
};