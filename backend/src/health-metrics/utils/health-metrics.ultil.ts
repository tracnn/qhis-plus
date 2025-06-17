import { BLOOD_PRESSURE_STATUS_ENUM, BLOOD_PRESSURE_STATUS_NUMBER, BMI_STATUS } from "../enums/health-metrics.enum";

//Tính BMI
export function calculateBMI(weight: number, height: number) {
    return (weight * 10000) / (height * height);
}

//Trạng thái BMI
export function calculateBMIStatus(bmi: number) {
    if (bmi < 18.5) {
        return BMI_STATUS.UNDERWEIGHT;
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return BMI_STATUS.NORMAL;
    } else if (bmi >= 25 && bmi <= 29.9) {
        return BMI_STATUS.OVERWEIGHT;
    } else {
        return BMI_STATUS.OBESE;
    }
}

//Trạng thái huyết áp
export function calculateBloodPressureStatus(systolic: number, diastolic: number) {
    if (systolic <= 120 && diastolic <= 80) {
        return BLOOD_PRESSURE_STATUS_ENUM.NORMAL;
    } else if (systolic > 120 && systolic <= 140 && diastolic <= 80) {
        return BLOOD_PRESSURE_STATUS_ENUM.HIGH_BLOOD_PRESSURE_STAGE_1;
    } else if (systolic >= 140 && systolic < 160 && diastolic < 90) {
        return BLOOD_PRESSURE_STATUS_ENUM.HIGH_BLOOD_PRESSURE_STAGE_1;
    } else if (systolic >= 160 && systolic < 180 && diastolic < 100) {
        return BLOOD_PRESSURE_STATUS_ENUM.HIGH_BLOOD_PRESSURE_STAGE_2;
    } else if (systolic >= 180 && diastolic < 110) {
        return BLOOD_PRESSURE_STATUS_ENUM.HIGH_BLOOD_PRESSURE_STAGE_3;
    } else if (systolic >= 180 && diastolic >= 110) {
        return BLOOD_PRESSURE_STATUS_ENUM.HYPER_HIGH_BLOOD_PRESSURE;
    } else if (systolic < 120 && diastolic >= 80) {
        return BLOOD_PRESSURE_STATUS_ENUM.LOW_BLOOD_PRESSURE;
    } else if (systolic < 120 && diastolic >= 80) {
        return BLOOD_PRESSURE_STATUS_ENUM.LOW_BLOOD_PRESSURE;
    } else if (systolic < 120 && diastolic >= 80) {
    } else {
        return '';
    }
}

//Trạng thái huyết áp convert to number
export function calculateBloodPressureStatusNumber(bloodPressureStatus: string) {
    switch (bloodPressureStatus) {
        case BLOOD_PRESSURE_STATUS_ENUM.NORMAL:
            return BLOOD_PRESSURE_STATUS_NUMBER.NORMAL;
        case BLOOD_PRESSURE_STATUS_ENUM.HIGH_BLOOD_PRESSURE_STAGE_1:
            return BLOOD_PRESSURE_STATUS_NUMBER.HIGH_BLOOD_PRESSURE_STAGE_1;
        case BLOOD_PRESSURE_STATUS_ENUM.HIGH_BLOOD_PRESSURE_STAGE_2:
            return BLOOD_PRESSURE_STATUS_NUMBER.HIGH_BLOOD_PRESSURE_STAGE_2;
        case BLOOD_PRESSURE_STATUS_ENUM.HIGH_BLOOD_PRESSURE_STAGE_3:
            return BLOOD_PRESSURE_STATUS_NUMBER.HIGH_BLOOD_PRESSURE_STAGE_3;
        case BLOOD_PRESSURE_STATUS_ENUM.HYPER_HIGH_BLOOD_PRESSURE:
            return BLOOD_PRESSURE_STATUS_NUMBER.HYPER_HIGH_BLOOD_PRESSURE;
        case BLOOD_PRESSURE_STATUS_ENUM.LOW_BLOOD_PRESSURE:
            return BLOOD_PRESSURE_STATUS_NUMBER.LOW_BLOOD_PRESSURE;
        case BLOOD_PRESSURE_STATUS_ENUM.LOW_BLOOD_PRESSURE_STAGE_1:
            return BLOOD_PRESSURE_STATUS_NUMBER.LOW_BLOOD_PRESSURE_STAGE_1;
        case BLOOD_PRESSURE_STATUS_ENUM.LOW_BLOOD_PRESSURE_STAGE_2:
            return BLOOD_PRESSURE_STATUS_NUMBER.LOW_BLOOD_PRESSURE_STAGE_2;
        case BLOOD_PRESSURE_STATUS_ENUM.LOW_BLOOD_PRESSURE_STAGE_3:
            return BLOOD_PRESSURE_STATUS_NUMBER.LOW_BLOOD_PRESSURE_STAGE_3;
        case BLOOD_PRESSURE_STATUS_ENUM.HYPER_LOW_BLOOD_PRESSURE:
            return BLOOD_PRESSURE_STATUS_NUMBER.HYPER_LOW_BLOOD_PRESSURE;
        default:
            return 0;
    }
}