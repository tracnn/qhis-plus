export interface ITheBhytValidator {
  validateMaThe(maThe: string): ValidationResult;
  validateHoTen(hoTen: string): ValidationResult;
  validateNgaySinh(ngaySinh: string | number): ValidationResult;
  validateGioiTinh(gioiTinh: string | number): ValidationResult;
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