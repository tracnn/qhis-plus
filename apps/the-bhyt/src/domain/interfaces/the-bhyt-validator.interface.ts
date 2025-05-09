export interface ITheBhytValidator {
    validateTheBhyt(params: {
        maCSKCB: string;
        gioiTinh: string;
    }, checkResult: {
        maDKBD: string;
        gioiTinh: string;
        gtTheTu: string;
        gtTheDen: string;
    }): string;
}

export interface ValidationResult {
    isValid: boolean;
    fieldName?: string;
    errorCode?: string;
    errorMessage?: string;
} 