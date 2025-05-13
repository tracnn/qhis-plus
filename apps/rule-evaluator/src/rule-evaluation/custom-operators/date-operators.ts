import { OperatorEvaluator } from 'json-rules-engine';

export const dateOperators: Record<string, OperatorEvaluator<any, any>> = {
  // Kiểm tra xem bệnh nhân có lịch sử phẫu thuật trong vòng 1 năm không
  recentSurgery: (factValue: string, jsonValue: { months: number }) => {
    const surgeryDate = new Date(factValue);
    const now = new Date();
    const difference = (now.getTime() - surgeryDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    return difference <= jsonValue.months;
  }
};