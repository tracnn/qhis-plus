import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseDto } from '../../../common/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetSdaCommuneDto extends BaseDto {       
    @ApiProperty({
        description: 'ID của quận/huyện',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @Transform(({ value }) => Number(value))
    districtId: number;
} 