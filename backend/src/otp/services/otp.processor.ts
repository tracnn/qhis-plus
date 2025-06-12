import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Processor('otp-queue')
export class OtpProcessor {
    @Process()
    async handleSendOtp(job: Job) {
        const { phone, zalo_user_id, otp } = job.data;

        if (zalo_user_id) {
            await this.sendZaloOtp(zalo_user_id, otp);
        } else {
            await this.sendSmsOtp(phone, otp);
        }
    }

  private async sendZaloOtp(zaloUserId: string, otp: string) {
    // const accessToken = process.env.ZALO_ACCESS_TOKEN;
    // const response = await axios.post(
    //   'https://openapi.zalo.me/v2.0/oa/message/template',
    //   {
    //     phone: zaloUserId,
    //     template_id: process.env.ZALO_TEMPLATE_ID,
    //     params: {
    //       otp_code: otp,
    //     },
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   },
    // );
    console.log('Gửi OTP qua Zalo');
  }

  private async sendSmsOtp(phone: string, otp: string) {
    // const smsProviderUrl = process.env.SMS_PROVIDER_URL;
    // const response = await axios.post(smsProviderUrl, {
    //   phone,
    //   message: `Mã OTP của bạn là: ${otp}.`,
    // });
    console.log('Gửi OTP qua SMS');
  }
}