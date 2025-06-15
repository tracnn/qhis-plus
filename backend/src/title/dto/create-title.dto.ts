import { IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTitleDto {
    @ApiProperty({
        description: 'Mã chức vụ',
        example: 'TSBS',
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z0-9_.]+$/)
    titleCode: string;

    @ApiProperty({
        description: 'Tên chức vụ',
        example: 'Tiến sĩ bác sĩ',
    })
    @IsNotEmpty()
    @IsString()
    titleName: string;

    @ApiProperty({
        description: 'Thứ tự chức vụ',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    order: number;
}
