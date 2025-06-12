import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'Username, National Identity Card (12 digits), or Social Insurance Code (10 digits)',
        example: 'johndoe',
        examples: ['johndoe', '123456789012', '1234567890']
    })
    @IsString()
    @IsNotEmpty()
    identifier: string;

    @ApiProperty({
        description: 'User password',
        example: 'password123'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
} 