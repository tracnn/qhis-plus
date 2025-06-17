// BMI Status
export enum BMI_STATUS {
    UNDERWEIGHT = 'Thiếu cân',
    NORMAL = 'Bình thường',
    OVERWEIGHT = 'Thừa cân',
    OBESE = 'Béo phì',
}

// Blood Pressure Status
export enum BLOOD_PRESSURE_STATUS_ENUM {
    NORMAL = 'Bình thường',
    HIGH_BLOOD_PRESSURE_STAGE_1 = 'Huyết áp cao cấp 1',
    HIGH_BLOOD_PRESSURE_STAGE_2 = 'Huyết áp cao cấp 2',
    HIGH_BLOOD_PRESSURE_STAGE_3 = 'Huyết áp cao cấp 3',
    HYPER_HIGH_BLOOD_PRESSURE = 'Huyết áp siêu cao',
    LOW_BLOOD_PRESSURE = 'Huyết áp thấp',
    LOW_BLOOD_PRESSURE_STAGE_1 = 'Huyết áp thấp cấp 1',
    LOW_BLOOD_PRESSURE_STAGE_2 = 'Huyết áp thấp cấp 2',
    LOW_BLOOD_PRESSURE_STAGE_3 = 'Huyết áp thấp cấp 3',
    HYPER_LOW_BLOOD_PRESSURE = 'Huyết áp siêu thấp',
}

// Blood Pressure enum convert to number
export enum BLOOD_PRESSURE_STATUS_NUMBER {
    NORMAL = 0,
    ELEVATED = 1,
    HIGH_BLOOD_PRESSURE_STAGE_1 = 2,
    HIGH_BLOOD_PRESSURE_STAGE_2 = 3,
    HIGH_BLOOD_PRESSURE_STAGE_3 = 4,
    HYPER_HIGH_BLOOD_PRESSURE = 5,
    LOW_BLOOD_PRESSURE = -1,
    LOW_BLOOD_PRESSURE_STAGE_1 = -2,
    LOW_BLOOD_PRESSURE_STAGE_2 = -3,
    LOW_BLOOD_PRESSURE_STAGE_3 = -4,
    HYPER_LOW_BLOOD_PRESSURE = -5,
}