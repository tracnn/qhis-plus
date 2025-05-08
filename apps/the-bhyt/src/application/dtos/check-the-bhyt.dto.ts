import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckTheBhytDto {
  @ApiProperty({ description: 'Mã thẻ BHYT' })
  @IsString()
  @IsNotEmpty()
  maThe: string;

  @ApiProperty({ description: 'Họ và tên' })
  @IsString()
  @IsNotEmpty()
  hoTen: string;

  @ApiProperty({ description: 'Ngày sinh' })
  @IsDateString()
  @IsNotEmpty()
  ngaySinh: string;

  @ApiProperty({ description: 'Mã liên kết' })
  @IsString()
  @IsNotEmpty()
  ma_lk: string;

  @ApiProperty({ description: 'Mã cơ sở KCB' })
  @IsString()
  @IsNotEmpty()
  maCSKCB: string;

  @ApiProperty({ description: 'Giới tính' })
  @IsString()
  @IsNotEmpty()
  gioiTinh: string;

  @ApiProperty({ description: 'Access token' })
  @IsString()
  @IsOptional()
  token?: string;

  @ApiProperty({ description: 'ID token' })
  @IsString()
  @IsOptional()
  idToken?: string;
} 