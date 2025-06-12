import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAdminAuthGuard } from './jwt-admin-auth.guard';

@ApiTags('Admin Auth')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() dto: AdminLoginDto) {
    return this.adminAuthService.login(dto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAdminAuthGuard)
  @ApiResponse({ status: 200, description: 'Return admin me' })
  @Get('me')
  @ApiOperation({ summary: 'Get admin me' })
  async adminMe(@Req() req: any) {
    console.log(req.user.userId);
    return this.adminAuthService.adminMe(req.user.userId);
  }
}
