import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, Matches, IsDateString } from 'class-validator';
import { BaseDto } from '../../common/base.dto';

export class ValidateUserDto extends BaseDto {
    @ApiProperty({ example: 'Nguyễn Văn A', description: 'Full Name' })
    @IsString({ message: 'Tên không hợp lệ' })
    @IsNotEmpty({ message: 'Tên không được để trống' })
    @Length(2, 100, { message: 'Tên phải có ít nhất 2 ký tự và tối đa 100 ký tự' })
    fullName: string;

    @ApiProperty({ example: '001234567890', description: 'Identity Number' })
    @IsString({ message: 'Mã CCCD/CMND không hợp lệ' })
    @IsNotEmpty({ message: 'Mã CCCD/CMND không được để trống' })
    @Length(12, 12, { message: 'Mã CCCD/CMND phải có 12 chữ số' })
    @Matches(/^[0-9]+$/, { message: 'Mã CCCD/CMND phải là số' })
    identityNumber: string;

    @ApiProperty({ example: '0123456789', description: 'Phone Number' })
    @IsString({ message: 'Số điện thoại không hợp lệ' })
    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @Length(10, 10, { message: 'Số điện thoại phải có 10 chữ số' })
    @Matches(/^[0-9]+$/, { message: 'Số điện thoại phải là số' })
    phoneNumber: string;

    @ApiProperty({ example: '20/01/1990', description: 'Birth Date' })
    @Matches(/^(([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}|\d{4})$/, { message: 'Ngày sinh không hợp lệ' })
    @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
    birthDate: string;
} 