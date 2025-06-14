import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSpecialtyDto {
    @ApiProperty({
        description: 'Mã chuyên khoa',
        example: 'SP001',
    })
    @IsNotEmpty()
    @IsString()
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
    @IsNotEmpty()
    @IsNumber()
    order: number;
}
