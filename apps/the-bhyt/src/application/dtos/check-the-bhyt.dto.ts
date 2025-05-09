import { IsString, IsNotEmpty, IsOptional, Matches, Length, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CheckTheBhytDto {
  @ApiProperty({ description: 'Mã thẻ BHYT' })
  @IsString({ message: 'Mã thẻ BHYT phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Mã thẻ BHYT không được để trống' })
  @Length(10, 15, { message: 'Mã thẻ BHYT phải có độ dài từ 10 đến 15 ký tự' })
  @Matches(/^(?:\d{10}|\d{12}|[A-Z]{2}\d{13})$/, {
    message: 'Mã thẻ BHYT không hợp lệ. Phải là 10 hoặc 12 số, hoặc 2 chữ in hoa + 13 số',
  })
  maThe: string;

  @ApiProperty({ description: 'Họ và tên' })
  @IsString({ message: 'Họ tên phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @Length(2, 100, { message: 'Họ tên phải có độ dài từ 2 đến 100 ký tự' })
  hoTen: string;

  @ApiProperty({ description: 'Ngày sinh' })
  @IsString({ message: 'Ngày sinh phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$|^\d{4}$/, {
    message: 'Ngày sinh phải có định dạng DD/MM/YYYY hoặc YYYY',
  })
  ngaySinh: string;

  @ApiProperty({ description: 'Mã liên kết' })
  @IsString({ message: 'Mã lượt khám phải là chuỗi ký tự' })
  ma_lk: string;

  @ApiProperty({ description: 'Mã cơ sở KCB' })
  @IsString({ message: 'Mã cơ sở KCB phải là chuỗi ký tự' })
  maCSKCB: string;

  @ApiProperty({ description: 'Giới tính' })
  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  @Transform(({ value }) => String(value))
  @IsIn(['1', '2', '3'], { message: 'Giới tính phải có giá trị là 1 (Nam), 2 (Nữ) hoặc 3 (Chưa xác định)' })
  gioiTinh: string;

  @ApiProperty({ description: 'Access token' })
  @IsString({ message: 'Access token phải là chuỗi ký tự' })
  @IsOptional()
  token?: string;

  @ApiProperty({ description: 'ID token' })
  @IsString({ message: 'ID token phải là chuỗi ký tự' })
  @IsOptional()
  idToken?: string;
} 