import { Controller, UseGuards, Get, Post, Put, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';
import { ValidateUserDto } from './dto/validate-user.dto';
import { User } from './entities/user.entity';
import { VerifyRegisterOtpDto } from './dto/verify-register-otp.dto';
import { UpdatePasswordWithOtpDto } from './dto/update-password-with-otp-dto';
import { UpdatePasswordWithOtpCommand } from './commands/update-password-with-otp.command';
import { RequestUpdatePasswordOtpDto } from './dto/request-update-password-otp.dto';
import { ChangePasswordDto } from './dto/change-password.dto';


@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(
        private readonly service: UserService,
    ) {}

    @ApiOperation({ summary: 'Check if user can be created' })
    @Post('can-create')
    async canCreate(@Body() validateDto: ValidateUserDto) {
        return await this.service.canCreate(validateDto);
    }

    @ApiOperation({ summary: 'Create new user' })
    @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post('create')
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.service.create(createUserDto);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return list of users', type: [UserResponseDto] })
    @Get()
    async findAll(@Query() query: GetUsersDto) {
        // TODO: Implement get all users
        return await this.service.findAll(query);
    }

    @ApiOperation({ summary: 'Get user by ID' })
    @ApiResponse({ status: 200, description: 'Return user information', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Get(':id')
    async findOne(@Param('id') id: string) {
        // TODO: Implement get user by ID
        //return await this.service.findOne(id);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, description: 'User updated successfully', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Put('me')
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        // TODO: Implement update user
        return {};
    }

    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        // TODO: Implement delete user
        return await this.service.deleteUser(id);
    }

    @ApiOperation({ summary: 'Verify register OTP' })
    @ApiResponse({ status: 200, description: 'OTP verified successfully', type: UserResponseDto })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post('verify-register-otp')
    async verifyRegisterOtp(@Body() verifyRegisterOtpDto: VerifyRegisterOtpDto) {
        return await this.service.verifyRegisterOtp(verifyRegisterOtpDto.phoneNumber, verifyRegisterOtpDto.otp);
    }

    @ApiOperation({ summary: 'Update password with OTP' })
    @ApiResponse({ status: 200, description: 'Password updated successfully' })
    @ApiResponse({ status: 401, description: 'Invalid OTP' })
    @Post('update-password-with-otp')
    async updatePasswordWithOtp(@Body() body: UpdatePasswordWithOtpDto) {
        return await this.service.updatePasswordWithOtp(body);
    }

    @ApiOperation({ summary: 'Request update password OTP' })
    @ApiResponse({ status: 200, description: 'OTP requested successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post('request-update-password-otp')
    async requestUpdatePasswordOtp(@Body() body: RequestUpdatePasswordOtpDto) {
        return this.service.requestUpdatePasswordOtp(body);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Change password' })
    @ApiResponse({ status: 201, description: 'Password changed successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @Post('change-password')
    async changePassword(@Req() req: any, @Body() body: ChangePasswordDto) {
        return await this.service.changePassword(req.user.userId, body);
    }
}
