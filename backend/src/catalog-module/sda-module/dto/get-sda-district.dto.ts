import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseDto } from '../../../common/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetSdaDistrictDto extends BaseDto {   
    @ApiProperty({
        description: 'ID của tỉnh/thành phố',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    provinceId: number;
} 