import { PartialType } from '@nestjs/swagger';
import { CreateFamilyMemberDto } from './create-family-member.dto';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFamilyMemberDto extends PartialType(CreateFamilyMemberDto) {
    @ApiProperty({
        description: 'Phone Number',
        example: '0987654321',
        required: false
    })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiProperty({
        description: 'Email',
        example: 'johndoe@example.com',
        required: false
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        description: 'Relationship',
        example: '1',
        required: false
    })
    @IsNumber()
    relationshipId?: number;

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
        description: 'Address',
        example: '123 Main St, Anytown, USA',
        required: false
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({
        description: 'Career ID',
        example: 1,
        required: false
    })
    @IsOptional()
    @IsNumber()
    careerId?: number;

    @ApiProperty({
        description: 'Mã dân tộc của người thân',
        example: 1,
        required: false
    })
    @IsOptional()
    @IsNumber()
    ethnicId?: number;

    @ApiProperty({
        description: 'Mã quốc tịch của người thân',
        example: 1,
        required: false
    })
    @IsOptional()
    @IsNumber()
    nationalId?: number;
}
