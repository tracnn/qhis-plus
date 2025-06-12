import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, IsEnum } from 'class-validator';
import { OTPType } from '../enums/otp.enums';

export class CreateOtpDto {
    @ApiProperty({
        example: '0909090909'
    })
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @IsString({ message: 'Số điện thoại phải là chuỗi' })
    @Matches(/^[0-9]{10}$/, { message: 'Số điện thoại phải có 10 chữ số' })
    phoneNumber: string;

    @ApiProperty({
        example: 'REGISTER'
    })
    @IsNotEmpty({ message: 'Loại OTP không được để trống' })
    @IsEnum(OTPType, { message: 'Loại OTP không hợp lệ' })
    otpType: OTPType;
} 