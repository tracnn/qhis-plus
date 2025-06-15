import { SLOT_TYPE } from "../enums/slot-type.enum";

/**
 * Hàm xác định SLOT_TYPE dựa trên SLOT_TIME
 * @param slotTime string dạng "HH:mm"
 * @returns SLOT_TYPE
 */
export function getSlotTypeBySlotTime(slotTime: string): SLOT_TYPE {
    const [hour, minute] = slotTime.split(':').map(Number);

    // Quy tắc phân loại ca (tùy theo định nghĩa của bạn, dưới đây là ví dụ phổ biến)
    // Sáng: 06:00 - 11:45
    if (hour < 12) {
        return SLOT_TYPE.MORNING;
    }
    // Chiều: 12:00 - 17:45
    if (hour < 18) {
        return SLOT_TYPE.AFTERNOON;
    }
    // Tối: 18:00 trở đi
    return SLOT_TYPE.EVENING;
}