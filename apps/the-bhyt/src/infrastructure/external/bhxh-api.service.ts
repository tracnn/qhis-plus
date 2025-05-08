import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { EnvConfig } from '../config/env.config';
@Injectable()
export class BhxhApiService {
  private readonly logger = new Logger(BhxhApiService.name);

  constructor(private readonly httpService: HttpService) {}

  async checkTheBhyt(params: {
    maThe: string;
    hoTen: string;
    ngaySinh: string;
    token: string;
    idToken: string;
  }): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          EnvConfig.BH_API_URL,
          {
            maThe: params.maThe,
            hoTen: params.hoTen,
            ngaySinh: params.ngaySinh,
            hoTenCb: EnvConfig.BH_HO_TEN_CB,
            cccdCb: EnvConfig.BH_CCCD_CB
          },
          {
            params: {
              token: params.token,
              id_token: params.idToken,
              username: EnvConfig.BH_USERNAME,
              password: EnvConfig.BH_PASSWORD
            }
          }
        )
      );
      
      return response.data;
    } catch (error) {
      this.logger.error('Failed to check BHYT card:', error.message);
      throw new Error('Failed to check BHYT card');
    }
  }
} 