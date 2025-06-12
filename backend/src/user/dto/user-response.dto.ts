import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
    @Expose()
    @ApiProperty({
        description: 'User ID',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id: string;

    @Expose()
    @ApiProperty({
        description: 'Username',
        example: 'johndoe'
    })
    username: string;

    @Expose()
    @ApiProperty({
        description: 'Email address',
        example: 'john.doe@example.com'
    })
    email: string;

    @Expose()
    @ApiProperty({
        description: 'Social Insurance Code',
        example: '1234567890',
        required: false
    })
    insuranceNumber?: string;

    @Expose()
    @ApiProperty({
        description: 'Health Card Number',
        example: '123456789012',
        required: false
    })
    birthDate?: string;

    @Expose()
    @ApiProperty({
        description: 'National Identity Card',
        example: '123456789012',
        required: false
    })
    identityNumber?: string;

    @Expose()
    @ApiProperty({
        description: 'Gender Code',
        example: 1,
        required: false
    })
    genderCode?: number;

    @Expose()
    @ApiProperty({
        description: 'Health Card Number',
        example: '123456789012',
        required: false
    })
    healthCardNumber?: string;

    @Expose()
    @ApiProperty({
        description: 'Phone Number',
        example: '0987654321',
        required: false
    })
    phoneNumber?: string;

    @Expose()
    @ApiProperty({
        description: 'Account lock status',
        example: false
    })
    isLocked: boolean;

    @Expose()
    @ApiProperty({
        description: 'Last login timestamp',
        example: '2024-03-20T10:00:00Z',
        required: false
    })
    lastLoginAt?: Date;

    @Expose()
    @ApiProperty({
        description: 'Creation timestamp',
        example: '2024-03-20T10:00:00Z'
    })
    createdAt: Date;

    @Expose()
    @ApiProperty({
        description: 'Last update timestamp',
        example: '2024-03-20T10:00:00Z'
    })
    updatedAt: Date;

    @Expose()
    @ApiProperty({
        description: 'Full name',
        example: 'John Doe'
    })
    fullName: string;

    @Expose()
    @ApiProperty({
        description: 'Province ID',
        example: '1234567890'
    })
    provinceId: string;

    @Expose()
    @ApiProperty({
        description: 'District ID',
        example: '1234567890'
    })
    districtId: string;

    @Expose()
    @ApiProperty({
        description: 'Commune ID',
        example: '1234567890'
    })
    communeId: string;

    @Expose()
    @ApiProperty({ 
        description: 'Ethnic ID',
        example: '1234567890'
    })
    ethnicId: string;

    @Expose()
    @ApiProperty({
        description: 'National ID',
        example: '1234567890'
    })
    nationalId: string;

    @Expose()
    @ApiProperty({
        description: 'Address',
        example: '1234567890'
    })
    address: string;  
} 