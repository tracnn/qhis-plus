import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";

export class CreateSpecialtyDto {
    @ApiProperty({
        description: 'Mã chuyên khoa',
        example: 'SP001',
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z0-9_.]+$/)
    specialtyCode: string;

    @ApiProperty({
        description: 'Tên chuyên khoa',
        example: 'Chuyên khoa nội',
    })
    @IsNotEmpty()
    @IsString()
    specialtyName: string;

    @ApiProperty({
        description: 'Mô tả chuyên khoa',
        example: 'Mệt mỏi chán ăn...',
    })
    @IsNotEmpty()
    @IsString()
    specialtyDescription: string;

    @ApiProperty({
        description: 'Thứ tự chuyên khoa',
        example: 1,
    })
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    order: number;
}
