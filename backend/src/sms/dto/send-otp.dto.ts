import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SendOtpDto {
    @ApiProperty({
        description: 'The phone number of the user',
        example: '0988795445',
    })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'The OTP code',
        example: '123456',
    })
    @IsNotEmpty()
    @IsString()
    otp: string;
}