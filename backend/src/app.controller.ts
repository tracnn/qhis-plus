import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ZaloService } from './otp/services/zalo.service';
import { ConfirmRegMessage } from './otp/dto/zalo-message.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly zaloService: ZaloService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
