import { IsOptional, IsString, IsDateString, IsNumber, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetCheckHeinCardsDto {
  @ApiProperty({ required: false, description: 'Ngày bắt đầu (YYYY-MM-DD HH:mm:ss)' })
  @IsString()
  startDate?: string;

  @ApiProperty({ required: false, description: 'Ngày kết thúc (YYYY-MM-DD HH:mm:ss)' })
  @IsString()
  endDate?: string;

  @ApiProperty({ required: false, description: 'Danh sách mã kết quả (phân cách bằng dấu phẩy)', example: '01,02,03' })
  @IsOptional()
  //@IsString()
  @Transform(({ value }) => {
    if (!value) return undefined;
    return value.split(',').map(item => item.trim()).filter(Boolean);
  })
  maKetQua?: string[];

  @ApiProperty({ required: false, description: 'Số trang', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ required: false, description: 'Số bản ghi trên một trang', default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
} 