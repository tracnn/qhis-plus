import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTitleDto {
    @ApiProperty({
        description: 'Mã chức vụ',
        example: 'TSBS',
    })
    @IsNotEmpty()
    @IsString()
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
