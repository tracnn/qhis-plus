// auth-service/src/auth.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getHello(): Promise<string> {
    return 'Hello from Auth Service';
  }

  @Get('user')
  async getUser(@Query('id') id: string) {
    return this.authService.validateUser(id);
  }
}