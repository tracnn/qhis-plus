import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class OtpResponseDto {
    @Expose()
    @ApiProperty({
        description: 'OTP ID',
        example: '24e8d4cb-47b0-46d7-8100-ea9ddce37ba8'
    })
    id: string;

    @Expose()
    @ApiProperty({
        description: 'OTP Created At',
        example: '2024-01-01T00:00:00Z'
    })
    createdAt: Date;

    @Expose()
    @ApiProperty({
        description: 'OTP Updated At',
        example: '2024-01-01T00:00:00Z'
    })
    updatedAt: Date;

    @Expose()
    @ApiProperty({
        description: 'OTP Deleted At',
        example: '2024-01-01T00:00:00Z'
    })
    isDeleted: boolean;

    @Expose()
    @ApiProperty({
        description: 'OTP Deleted At',
        example: '2024-01-01T00:00:00Z'
    })
    version: number;

    @Expose()
    @ApiProperty({
        description: 'Phone Number',
        example: '1234567890'
    })
    phoneNumber: string;

    @Expose()
    @ApiProperty({
        description: 'OTP Type',
        example: 'ZALO'
    })
    otpType: string;

    @Expose()
    @ApiProperty({
        description: 'OTP Expiration Time',
        example: '2024-01-01T00:00:00Z'
    })
    expiresAt: Date;

    @Expose()
    @ApiProperty({
        description: 'OTP Attempts',
        example: 0
    })
    attempts: number;

    @Expose()
    @ApiProperty({
        description: 'OTP Max Attempts',
        example: 3
    })
    maxAttempts: number;

    @Expose()
    @ApiProperty({
        description: 'OTP Code',
        example: '123456'
    })
    otpCode: string;
    
}