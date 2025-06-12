import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class VerifyRegisterOtpDto {
    @ApiProperty({ description: 'Phone number' })
    @IsString({ message: 'Số điện thoại không hợp lệ' })
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Length(10, 10, { message: 'Số điện thoại phải có 10 chữ số' })
    @Matches(/^[0-9]+$/, { message: 'Số điện thoại phải là số' })
    phoneNumber: string;
    
    @ApiProperty({ description: 'OTP' })
    @IsString({ message: 'OTP không hợp lệ' })
    @IsNotEmpty({ message: 'OTP không được để trống' })
    @Length(6, 6, { message: 'OTP phải có 6 chữ số' })
    @Matches(/^[0-9]+$/, { message: 'OTP phải là số' })
    otp: string;
}
