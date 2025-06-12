import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOtpDto } from './dto/create-otp.dto';
import { VerifyOTPDto } from './dto/verify-otp.dto';
import { CreateOtpQuery } from './commands/create-otp.command';
import { VerifyOTPCommand } from './commands/verify-otp.command';
import { SmsMessageDto } from './dto/sms-message.dto';
import { SmsService } from './services/sms.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OtpService } from './otp.service';
import { OTPType } from './enums/otp.enums';
import { ZaloService } from './services/zalo.service';
import { ConfirmRegMessage } from './dto/zalo-message.dto';

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
    constructor(
        private readonly commandBus: CommandBus, 
        private readonly zaloService: ZaloService,
        private readonly otpService: OtpService
    ) { }

    @ApiOperation({ summary: 'Create OTP' })
    @Post('create')
    async createOTP(@Body() dto: CreateOtpDto) {
        return this.otpService.createOtp(dto);
    }

    @ApiOperation({ summary: 'Verify OTP' })
    @Post('verify')
    async verifyOTP(@Body() dto: VerifyOTPDto) {
        return await this.otpService.verifyOtp(dto.phoneNumber, dto.otpCode, dto.otpType);
    }

    @ApiOperation({ summary: 'Refresh Zalo Access Token' })
    @Post('refresh-zalo-token')
    async refreshZaloToken() {
        return await this.zaloService.refreshToken();
    }

    @ApiOperation({ summary: 'Delete OTP' })
    @Delete(':id')
    async deleteOTP(@Param('id') id: string) {
        return this.otpService.delete(id);
    }

    @ApiOperation({ summary: 'Get All OTPs' })
    @Get()
    async getAllOTPs() {
        return this.otpService.findAll();
    }
} 