import { Injectable } from '@nestjs/common';

@Injectable()
export class TheBhytValidatorService {
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