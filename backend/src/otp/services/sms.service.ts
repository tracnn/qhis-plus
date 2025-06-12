import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SMS_CONFIG } from '../../config/sms.config';
import { lastValueFrom } from 'rxjs';
import { SmsMessageDto } from '../dto/sms-message.dto';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private url = SMS_CONFIG.SMS_URL;
  private token = SMS_CONFIG.SMS_TOKEN;

  constructor(private readonly httpService: HttpService) {}

  async sendMessage(dto: SmsMessageDto): Promise<string | null> {
    return 'oks';
    const req = {
      code: dto.functionCode,
      category: 'patient',
      receivers: this.formatPhoneNumber(dto.phoneNumber),
      expired: new Date().toISOString(),
      scheduleTime: null,
      retry: 0,
      id: Date.now().toString(16) + '-' + Math.random().toString(16).substring(2, 10), //
      parameters: dto.parameters,
    };

    this.logger.log('SMS request:', JSON.stringify(req));

    try {
      const response = await lastValueFrom(
        this.httpService.post(this.url, req, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
        })
      );

      this.logger.log('SMS response:', JSON.stringify(response.data));

      const json = response.data;

      if (!json?.isError) {
        return json.message;
      }

      return null;
    } catch (error) {
      this.logger.error('SMS send error:', error?.message || error);
      return error?.message || null;
    }
  }
  private formatPhoneNumber(phone: string): string {
    return phone.startsWith('84') ? phone : `84${phone.slice(1)}`;
  }
}