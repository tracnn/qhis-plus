import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AdminLoginDto {
    @ApiProperty({
        description: 'Username',
        example: 'admin'
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'Password',
        example: '123456'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
} 