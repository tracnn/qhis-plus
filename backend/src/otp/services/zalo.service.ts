import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfirmRegMessage, ZaloMessageRequest } from '../dto/zalo-message.dto';
import * as fs from 'fs';
import { ZALO_CONSTANTS } from '../../constant/zalo.constants';
import { ZALO_CONFIG } from '../../config/zalo.config';
import * as path from 'path';
import { json } from 'express';

@Injectable()
export class ZaloService {
  private readonly logger = new Logger(ZaloService.name);

  private appId = ZALO_CONFIG.ZALO_APP_ID;
  private secretKey = ZALO_CONFIG.ZALO_SECRET_KEY;
  private tokenFile = './zalo_api_token.json'; //ZALO_CONFIG.ZALO_TOKEN_FILE || 
  private oauthUrl = ZALO_CONFIG.ZALO_OAUTH_URL;
  private businessUrl = ZALO_CONFIG.ZALO_BUSINESS_URL;
  private appointmentTempId = ZALO_CONFIG.ZALO_TEMPLATE_ID_APPOINTMENT;
  private otpTempId = ZALO_CONFIG.ZALO_TEMPLATE_ID_OTP;

  constructor(private readonly httpService: HttpService) {}


  public async handleAuthCallback(authorizationCode: string, oaId: string): Promise<string> {
    await this.collectAccessToken(authorizationCode);
    return 'success';
  }

  async collectAccessToken(authorizationCode: string): Promise<void> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          this.oauthUrl,
          new URLSearchParams({
            code: authorizationCode,
            app_id: this.appId,
            grant_type: 'authorization_code',
          }).toString(), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'secret_key': this.secretKey,
            }
          }
        )
      );
      this.saveToken(response.data);
      this.logger.log(ZALO_CONSTANTS.TOKEN_SUCCESS);
    } catch (error) {
      this.logger.error(`${ZALO_CONSTANTS.API_ERROR} ${error.message}`);
      throw new HttpException('Failed to collect Access Token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ======= ACCESS TOKEN METHODS =======
  private getAccessToken(): string {
    try {
      const content = fs.readFileSync(this.tokenFile, 'utf-8');
      const json = JSON.parse(content);
      return json[ZALO_CONSTANTS.ACCESS_TOKEN];
    } catch (error) {
      this.logger.error(`${ZALO_CONSTANTS.TOKEN_FILE_ERROR} ${error.message}`);
      throw new HttpException(ZALO_CONSTANTS.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }
  }

  private saveToken(data: any) {
    if (data[ZALO_CONSTANTS.ERROR]) {
      throw new HttpException(`${ZALO_CONSTANTS.API_ERROR} ${data[ZALO_CONSTANTS.ERROR_NAME]}`, HttpStatus.BAD_REQUEST);
    }
    const dir = path.dirname(this.tokenFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(this.tokenFile, JSON.stringify(data));
  }

  // ======= SEND MESSAGE METHODS =======
  async sendMessageConfirmReg(message: ConfirmRegMessage): Promise<any> {
    const zaloMessage = this.buildZaloMessage(message);
    return await this.sendMessage(zaloMessage);
  }

  private buildZaloMessage(message: ConfirmRegMessage): ZaloMessageRequest {
    return {
      phone: this.formatPhoneNumber(message.phone),
      template_id: this.otpTempId,
      template_data: {
        'otp': message.otp,
      },
    };
  }

  private async sendMessage(zaloMessageRequest: ZaloMessageRequest): Promise<any> {
    const accessToken = this.getAccessToken();
    const url = `${this.businessUrl}/message/template`;
    const headers = {
      access_token: accessToken,
      'Content-Type': 'application/json',
    };
    try {
      let response = await lastValueFrom(
        this.httpService.post(url, zaloMessageRequest, {
          headers
        })
      );
      const errorCode = response.data[ZALO_CONSTANTS.ERROR]

      // retry when token expired
      if (errorCode == -124 || errorCode == -216) {
        response = await lastValueFrom(
          this.httpService.post(url, zaloMessageRequest, {
            headers: {
              'access_token': await this.refreshToken(), //due to production conflict
              'Content-Type': 'application/json',
            }
          })
        );
      }
      if (response.data[ZALO_CONSTANTS.ERROR]) {
        throw new HttpException(`${ZALO_CONSTANTS.API_ERROR} ${response.data[ZALO_CONSTANTS.MESSAGE]}`, HttpStatus.BAD_REQUEST);
      }

      this.logger.log(`[Send Zalo] Success: ${JSON.stringify(response.data)}`);
      return response.data;

    } catch (error) {
      this.logger.error('Error sending Zalo message:', error.message);
      throw new HttpException('Failed to send Zalo message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ======= SEND MESSAGE METHODS =======
  async refreshToken(): Promise<string> {
    const content = fs.readFileSync(this.tokenFile, 'utf-8');
    const json = JSON.parse(content);
    let refreshToken = json[ZALO_CONSTANTS.REFRESH_TOKEN];

    const response = await lastValueFrom(
      this.httpService.post(
        this.oauthUrl,
        new URLSearchParams({
          refresh_token: refreshToken,
          app_id: this.appId,
          grant_type: 'refresh_token',
        }).toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'secret_key': this.secretKey,
          }
        }
      )
    );
    this.saveToken(response.data);
    return response.data[ZALO_CONSTANTS.ACCESS_TOKEN]
  }

  private formatPhoneNumber(phone: string): string {
    return phone.startsWith('84') ? phone : `84${phone.slice(1)}`;
  }
}