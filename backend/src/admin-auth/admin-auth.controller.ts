import { Controller, Post, Body } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Auth')
@Controller('admin-auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() dto: LoginDto) {
    return this.adminAuthService.login(dto);
  }
}
