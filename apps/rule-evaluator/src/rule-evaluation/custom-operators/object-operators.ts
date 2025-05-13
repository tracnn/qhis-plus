import { OperatorEvaluator } from 'json-rules-engine';

export const objectOperators: Record<string, OperatorEvaluator<any, any>> = {
  // Kiểm tra xem chỉ số huyết áp có nằm trong phạm vi an toàn không
  bloodPressureSafe: (factValue: { systolic: number; diastolic: number }, jsonValue: { minSystolic: number; maxSystolic: number, minDiastolic: number, maxDiastolic: number }) => {
    return (
      factValue.systolic >= jsonValue.minSystolic &&
      factValue.systolic <= jsonValue.maxSystolic &&
      factValue.diastolic >= jsonValue.minDiastolic &&
      factValue.diastolic <= jsonValue.maxDiastolic
    );
  },
  // Kiểm tra nếu đối tượng chứa khóa cụ thể
  hasKey: (factValue: object, jsonValue: string) => {
    return jsonValue in factValue;
  },

  // Kiểm tra nếu đối tượng chứa giá trị cụ thể
  hasValue: (factValue: object, jsonValue: any) => {
    return Object.values(factValue).includes(jsonValue);
  },

  // Kiểm tra nếu đối tượng rỗng
  isEmptyObject: (factValue: object) => {
    return Object.keys(factValue).length === 0;
  },

  // Kiểm tra nếu đối tượng chứa tất cả khóa được chỉ định
  hasAllKeys: (factValue: object, jsonValue: string[]) => {
    return jsonValue.every(key => key in factValue);
  }
};