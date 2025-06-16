import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CyberBillBachMaiService {
  private token: string | null = null;
  private tokenExpireAt: number | null = null;

  private readonly loginUrl = 'https://bachmaiws.vin-hoadon.com/api/services/hddtws/Authentication/GetToken';
  private readonly invoiceUrl = 'https://bachmaiws.vin-hoadon.com/api/services/hddtws/GuiHoaDon/TaiHoaDonPDF';

  // Cấu hình định danh doanh nghiệp
  private readonly doanhnghiep_mst = '0100923097';
  private readonly username = 'kws';
  private readonly password = '12345678';

  private async login(): Promise<string> {
    const response = await axios.post(this.loginUrl, {
      doanhnghiep_mst: this.doanhnghiep_mst,
      username: this.username,
      password: this.password
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const accessToken = response.data.result.access_token;
    const expireInSeconds = response.data.result.expire_in_seconds;

    this.token = `Bearer ${accessToken}`;
    this.tokenExpireAt = Date.now() + (expireInSeconds - 30) * 1000; // Trừ 30s để an toàn

    return this.token;
  }

  private async getValidToken(): Promise<string> {
    if (!this.token || !this.tokenExpireAt || Date.now() >= this.tokenExpireAt) {
      return this.login();
    }
    return this.token;
  }

  async getInvoicePdf(magiaodich: string, ma_hoadon: string): Promise<string> {
    const token = await this.getValidToken();

    const body = {
      doanhnghiep_mst: this.doanhnghiep_mst,
      magiaodich,
      ma_hoadon
    };

    const response = await axios.post(this.invoiceUrl, body, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });
    return response.data.result.base64pdf;
  }
}