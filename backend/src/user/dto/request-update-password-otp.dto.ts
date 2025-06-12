import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, Length, MinLength, MaxLength } from 'class-validator';
import { OTPType } from '../../otp/enums/otp.enums';

export class RequestUpdatePasswordOtpDto {
    @ApiProperty({ description: 'Phone number' })
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @IsString({ message: 'Số điện thoại không hợp lệ' })
    @Length(10, 10, { message: 'Số điện thoại phải có 10 chữ số' })
    @Matches(/^[0-9]+$/, { message: 'Số điện thoại phải là số' })
    phoneNumber: string;

    @ApiProperty({ description: 'Identity number or username'})
    @IsNotEmpty({ message: 'Tên đăng nhập hoặc CCCD không được để trống' })
    @IsString({ message: 'Tên đăng nhập hoặc CCCD không hợp lệ' })
    identity: string; // username hoặc CCCD

    @ApiProperty({ description: 'New password'})
    @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
    @IsString({ message: 'Mật khẩu mới không hợp lệ' })
    @MinLength(6, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
    @MaxLength(32, { message: 'Mật khẩu mới phải có tối đa 32 ký tự' })
    newPassword: string;

    @ApiProperty({ description: 'Confirm new password'})
    @IsNotEmpty({ message: 'Mật khẩu xác nhận không được để trống' })
    @IsString({ message: 'Mật khẩu xác nhận không hợp lệ' })
    @MinLength(6, { message: 'Mật khẩu xác nhận phải có ít nhất 6 ký tự' })
    @MaxLength(32, { message: 'Mật khẩu xác nhận phải có tối đa 32 ký tự' })
    confirmNewPassword: string;
}