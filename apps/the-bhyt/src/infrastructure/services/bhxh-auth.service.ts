import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { EnvConfig } from '../config/env.config';
import { IBhxhAuthService } from '../interfaces/bhxh-auth.service.interface';

@Injectable()
export class BhxhAuthService implements IBhxhAuthService {
  private readonly logger = new Logger(BhxhAuthService.name);
  private token: string | null = null;
  private idToken: string | null = null;
  private tokenExpiresAt: number | null = null;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getToken(): Promise<string> {
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (!this.token || !this.tokenExpiresAt || currentTime >= this.tokenExpiresAt) {
      await this.login();
    } else {
      this.logger.log('Using cached BHXH token.');
    }
    
    if (!this.token) {
      this.logger.error('Failed to obtain token after login attempt.');
      throw new Error('Failed to obtain token');
    }
    
    return this.token;
  }

  async getIdToken(): Promise<string> {
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (!this.idToken || !this.tokenExpiresAt || currentTime >= this.tokenExpiresAt) {
      await this.login();
    }
    
    if (!this.idToken) {
      throw new Error('Failed to obtain ID token');
    }
    
    return this.idToken;
  }

  private async login(): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(EnvConfig.BH_AUTH_URL, {
          username: EnvConfig.BH_USERNAME,
          password: EnvConfig.BH_PASSWORD
        })
      );

      if (response.data && response.data.APIKey.access_token) {
        this.token = response.data.APIKey.access_token;
        this.idToken = response.data.APIKey.id_token;
        this.logger.log('Successfully obtained new BHXH token');

        // Chuyển đổi thời gian hết hạn từ `expires_in` (ISO 8601) sang UNIX timestamp
        const expiresIn = new Date(response.data.APIKey.expires_in).getTime() / 1000;
        const currentTime = Math.floor(Date.now() / 1000);

        if (expiresIn <= currentTime) {
          this.logger.error('The received token is already expired.');
          throw new Error('Invalid token response: Token has already expired.');
        }

        this.tokenExpiresAt = expiresIn;
        this.logger.debug(`Token: ${this.token}`);
        this.logger.debug(`ID Token: ${this.idToken}`);
        this.logger.debug(`Token Expires At: ${new Date(this.tokenExpiresAt * 1000).toISOString()}`);
      } else {
        this.logger.error('Invalid token response structure from BHXH API');
        throw new Error('Invalid token response');
      }
    } catch (error) {
      this.logger.error('Failed to obtain BHXH token', error.message);
      throw new Error('Failed to obtain BHXH token');
    }
  }
} 