import { IsNotEmpty, IsString, Matches, IsIn, IsOptional, IsEnum } from 'class-validator';
import { OTPType } from '../enums/otp.enums';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOTPDto {
    @ApiProperty({
        example: '0909090909'
    })
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @IsString({ message: 'Số điện thoại phải là chuỗi' })
    @Matches(/^[0-9]{10}$/, { message: 'Số điện thoại phải có 10 chữ số' })
    phoneNumber: string;

    @ApiProperty({
        example: '123456'
    })
    @IsNotEmpty({ message: 'Mã OTP không được để trống' })
    @IsString({ message: 'Mã OTP phải là chuỗi' })
    @Matches(/^[0-9]{6}$/, { message: 'Mã OTP phải có 6 chữ số' })
    otpCode: string;

    @ApiProperty({
        example: 'REGISTER'
    })
    @IsOptional()
    @IsString({ message: 'Loại OTP phải là chuỗi' })
    @IsEnum(OTPType, { message: 'Loại OTP không hợp lệ' })
    otpType: OTPType;

    @ApiProperty({
        example: 'e7ec76d7-412a-4f99-b761-ca6b1ae47461'
    })
    @IsOptional()
    @IsString({ message: 'ID người dùng phải là chuỗi' })
    userId: string;
} 