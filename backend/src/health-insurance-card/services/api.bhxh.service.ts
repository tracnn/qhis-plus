import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DS_MA_KET_QUA } from '../../constant/bhxh.constant';
import { CheckHealthInsuranceDto } from '../dto/check-health-insurance.dto';
import { API_BHXH } from '../../config/bhxh.config';

@Injectable()
export class ApiBhxhService {
    private token: string | null = null;
    private idToken: string | null = null;
    private tokenExpiresAt: number | null = null;

    constructor(
        private readonly httpService: HttpService
    ) {}

    async check(params: CheckHealthInsuranceDto): Promise<any> {
        await this.ensureTokens();
        return await this.checkTheBhyt(params);
    }

    private async ensureTokens(): Promise<void> {
        const currentTime = Math.floor(Date.now() / 1000);
        
        // Kiểm tra nếu token chưa có hoặc đã hết hạn
        if (!this.token || !this.idToken || !this.tokenExpiresAt || currentTime >= this.tokenExpiresAt) {
            const { access_token, id_token, tokenExpiresAt } = await this.login();
            this.token = access_token;
            this.idToken = id_token;
            this.tokenExpiresAt = tokenExpiresAt;
        }
    }

    private async login(): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.post(API_BHXH.BH_AUTH_URL, {
                    username: API_BHXH.BH_USERNAME,
                    password: API_BHXH.BH_PASSWORD
                })
            );

            if (response.data?.APIKey?.access_token) {
                const { access_token, id_token, expires_in } = response.data.APIKey;
                const tokenExpiresAt = Math.floor(new Date(expires_in).getTime() / 1000);
                const currentTime = Math.floor(Date.now() / 1000);

                if (tokenExpiresAt <= currentTime) {
                    throw new Error('Invalid token response: Token has already expired.');
                }
                return { access_token, id_token, tokenExpiresAt };
            } else {
                throw new Error('Invalid token response structure from BHXH API');
            }
        } catch (error) {

        }
    }

    private async checkTheBhyt(params: CheckHealthInsuranceDto): Promise<any> {
        try {
            const response = await firstValueFrom(
                this.httpService.post(
                    API_BHXH.BH_API_URL,
                    {
                        maThe: params.identityNumber,
                        hoTen: params.fullName,
                        ngaySinh: params.birthDate,
                        hoTenCb: API_BHXH.BH_HO_TEN_CB,
                        cccdCb: API_BHXH.BH_CCCD_CB
                    },
                    {
                        params: {
                            token: this.token,
                            id_token: this.idToken,
                            username: API_BHXH.BH_USERNAME,
                            password: API_BHXH.BH_PASSWORD
                        }
                    }
                )
            );
        
            if (!response.data || !response.data.maKetQua) {
                throw new Error('Dữ liệu trả về từ BHXH không hợp lệ hoặc thiếu mã kết quả');
            }

            return {
                identityNumber: params.identityNumber,
                resultCode: response.data.maKetQua,
                resultNote: DS_MA_KET_QUA?.[response.data.maKetQua],
                heinCardNumber: response.data.maThe,
                fullName: response.data.hoTen,
                birthDate: response.data.ngaySinh,
                genderCode: this.mapGender(response.data.gioiTinh),
                address: response.data.diaChi,
                insuranceNumber: response.data.maSoBHXH
            };
        } catch (error) {
            throw new Error('Lỗi khi kiểm tra thông tin bảo hiểm y tế');
        }
    }

    private mapGender(gender: string): number {
        if (gender === "Nữ") return 1;
        if (gender === "Nam") return 2;
        return 3; // Khác với "Nữ" và "Nam"
    }
}