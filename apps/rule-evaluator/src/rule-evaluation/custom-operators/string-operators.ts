import { OperatorEvaluator } from 'json-rules-engine';

export const stringOperators: Record<string, OperatorEvaluator<any, any>> = {
  // Kiểm tra xem mã ICD-10 có đúng định dạng không
  isValidICD10: (factValue: string) => {
    const icd10Regex = /^[A-Z][0-9]{2}(\.[0-9A-Z]{1,4})?$/;
    return icd10Regex.test(factValue);
  },

  // Kiểm tra xem bệnh nhân có thuộc nhóm đối tượng nguy cơ (như trẻ em, người già, phụ nữ mang thai)
  isHighRiskPatient: (factValue: string, jsonValue: string[]) => {
    return jsonValue.includes(factValue);
  },

  // Kiểm tra xem bệnh nhân có được điều trị tại đúng khoa chuyên môn không
  correctDepartment: (factValue: string, jsonValue: string[]) => {
    return jsonValue.includes(factValue);
  },
    // Kiểm tra nếu chuỗi chứa từ khóa
    contains: (factValue: string, jsonValue: string) => {
        return factValue.includes(jsonValue);
      },
    
      // Kiểm tra nếu chuỗi khớp với regex
      matchesRegex: (factValue: string, jsonValue: string) => {
        const regex = new RegExp(jsonValue);
        return regex.test(factValue);
      },
    
      // Kiểm tra nếu chuỗi không được để trống
      isNotEmpty: (factValue: string) => {
        return factValue.trim().length > 0;
      },
    
      // Kiểm tra nếu chuỗi bắt đầu bằng một từ khóa
      startsWith: (factValue: string, jsonValue: string) => {
        return factValue.startsWith(jsonValue);
      },
    
      // Kiểm tra nếu chuỗi kết thúc bằng một từ khóa
      endsWith: (factValue: string, jsonValue: string) => {
        return factValue.endsWith(jsonValue);
      }
};