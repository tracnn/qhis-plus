import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, Matches, Length, IsNumber } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
        description: 'Email address',
        example: 'john.doe@example.com',
        required: false
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        description: 'Address',
        example: '123 Main St, Anytown, USA',
        required: false
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({
        description: 'Province ID',
        example: 1,
        required: false
    })
    @IsOptional()
    @IsNumber()
    provinceId?: number;

    @ApiProperty({
        description: 'District ID',
        example: 1,
        required: false
    })
    @IsOptional()
    @IsNumber()
    districtId?: number;

    @ApiProperty({
        description: 'Commune ID',
        example: 1,
        required: false
    })
    @IsOptional()
    @IsNumber()
    communeId?: number;

    @ApiProperty({
        description: 'Career ID',
        example: 1,
        required: false
    })
    @IsOptional()
    @IsNumber()
    careerId?: number;
} 