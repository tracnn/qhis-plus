import { Injectable } from '@nestjs/common';
import { ITheBhytValidator, ValidationResult } from '../interfaces/the-bhyt-validator.interface';

@Injectable()
export class TheBhytValidatorService implements ITheBhytValidator {
  validateMaThe(maThe: string): ValidationResult {
    // Kiểm tra null hoặc undefined
    if (!maThe) {
      return {
        isValid: false,
        fieldName: 'maThe',
        errorCode: '01',
        errorMessage: 'Mã thẻ không được để trống'
      };
    }

    // Kiểm tra độ dài và định dạng
    if (maThe.length === 10 || maThe.length === 12) {
      // Kiểm tra nếu là 10 hoặc 12 ký tự thì phải là số
      if (!/^\d+$/.test(maThe)) {
        return {
          isValid: false,
          fieldName: 'maThe',
          errorCode: '02',
          errorMessage: 'Mã thẻ 10 hoặc 12 ký tự phải chỉ chứa chữ số'
        };
      }
    } else if (maThe.length === 15) {
      // Kiểm tra nếu là 15 ký tự
      if (!/^[A-Z]{2}\d{13}$/.test(maThe)) {
        return {
          isValid: false,
          fieldName: 'maThe',
          errorCode: '03',
          errorMessage: 'Mã thẻ 15 ký tự phải có 2 ký tự đầu là chữ in hoa và 13 ký tự sau là chữ số'
        };
      }
    } else {
      return {
        isValid: false,
        fieldName: 'maThe',
        errorCode: '04',
        errorMessage: 'Mã thẻ phải có độ dài 10, 12 hoặc 15 ký tự'
      };
    }

    return { isValid: true };
  }

  validateHoTen(hoTen: string): ValidationResult {
    if (!hoTen || hoTen.trim() === '') {
      return {
        isValid: false,
        fieldName: 'hoTen',
        errorCode: '05',
        errorMessage: 'Họ tên không được để trống'
      };
    }
    return { isValid: true };
  }

  validateNgaySinh(ngaySinh: string | number): ValidationResult {
    if (!ngaySinh) {
      return {
        isValid: false,
        fieldName: 'ngaySinh',
        errorCode: '06',
        errorMessage: 'Ngày sinh không được để trống'
      };
    }

    // Nếu là số (năm)
    if (typeof ngaySinh === 'number') {
      const currentYear = new Date().getFullYear();
      if (ngaySinh < 1900 || ngaySinh > currentYear) {
        return {
          isValid: false,
          fieldName: 'ngaySinh',
          errorCode: '07',
          errorMessage: 'Năm sinh không hợp lệ'
        };
      }
      return { isValid: true };
    }

    // Nếu là chuỗi (định dạng DD/MM/YYYY)
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateRegex.test(ngaySinh)) {
      return {
        isValid: false,
        fieldName: 'ngaySinh',
        errorCode: '08',
        errorMessage: 'Ngày sinh phải có định dạng DD/MM/YYYY'
      };
    }

    // Kiểm tra tính hợp lệ của ngày tháng
    const [day, month, year] = ngaySinh.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
      return {
        isValid: false,
        fieldName: 'ngaySinh',
        errorCode: '09',
        errorMessage: 'Ngày sinh không hợp lệ'
      };
    }

    return { isValid: true };
  }

  validateGioiTinh(gioiTinh: string | number): ValidationResult {
    if (!gioiTinh) {
      return {
        isValid: false,
        fieldName: 'gioiTinh',
        errorCode: '10',
        errorMessage: 'Giới tính không được để trống'
      };
    }

    const gioiTinhValue = Number(gioiTinh);
    if (isNaN(gioiTinhValue) || ![1, 2, 3].includes(gioiTinhValue)) {
      return {
        isValid: false,
        fieldName: 'gioiTinh',
        errorCode: '11',
        errorMessage: 'Giới tính phải có giá trị là 1, 2 hoặc 3'
      };
    }

    return { isValid: true };
  }

  validateTheBhyt(params: {
    maCSKCB: string;
    gioiTinh: string;
  }, checkResult: {
    maDKBD: string;
    gioiTinh: string;
    gtTheTu: string;
    gtTheDen: string;
  }): string {
    // Kiểm tra các trường bắt buộc
    if (!checkResult.maDKBD || !checkResult.gioiTinh || !checkResult.gtTheTu || !checkResult.gtTheDen) {
      return '11';
    }

    // Kiểm tra maDKBD
    if (checkResult.maDKBD !== params.maCSKCB) {
      return '09';
    }

    // Kiểm tra giới tính
    const gioiTinhMap = {
      1: 'Nam',
      2: 'Nữ',
      3: 'Chưa xác định'
    };

    if (checkResult.gioiTinh === gioiTinhMap[params.gioiTinh]) {
      return '08';
    }

    // Trường hợp còn lại
    return '00';
  }
} 