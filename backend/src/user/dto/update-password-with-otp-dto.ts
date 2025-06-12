import { IsNotEmpty, IsString, MinLength, MaxLength, IsEnum, Length, Matches } from 'class-validator';
import { OTPType } from "src/otp/enums/otp.enums";
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordWithOtpDto {
  
  @ApiProperty({ description: 'Số điện thoại' })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsString({ message: 'Số điện thoại không hợp lệ' })
  @Length(10, 10, { message: 'Số điện thoại phải có 10 chữ số' })
  @Matches(/^[0-9]+$/, { message: 'Số điện thoại phải là số' })
  phoneNumber: string;

  @ApiProperty({ description: 'Tên đăng nhập hoặc CCCD' })
  @IsNotEmpty({ message: 'Tên đăng nhập hoặc CCCD không được để trống' })
  @IsString({ message: 'Tên đăng nhập hoặc CCCD không hợp lệ' })
  identity: string; // username hoặc CCCD

  @ApiProperty({ description: 'Mã OTP' })
  @IsNotEmpty({ message: 'Mã OTP không được để trống' })
  @IsString({ message: 'Mã OTP không hợp lệ' })
  @Length(6, 6, { message: 'Mã OTP phải có 6 chữ số' })
  @Matches(/^[0-9]+$/, { message: 'Mã OTP phải là số' })
  otpCode: string;
}