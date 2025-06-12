import { IsString, IsNotEmpty, Matches, Length } from 'class-validator';

export class CheckHealthInsuranceDto {
    @IsString({ message: 'Mã số CCCD/CMND không hợp lệ' })
    @IsNotEmpty({ message: 'Mã số CCCD/CMND không được để trống' })
    @Length(12, 12, { message: 'Mã số CCCD/CMND phải có 12 chữ số' })
    @Matches(/^\d{12}$/, { message: 'Mã số CCCD/CMND phải có 12 chữ số' })
    identityNumber: string;

    @IsString({ message: 'Tên không hợp lệ' })
    @IsNotEmpty({ message: 'Tên không được để trống' })
    @Length(2, 30, { message: 'Tên phải có ít nhất 2 ký tự và tối đa 100 ký tự' })
    fullName: string;

    @IsString({ message: 'Ngày sinh không hợp lệ' })
    @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$|^\d{4}$/, { message: 'Ngày sinh không hợp lệ' })
    birthDate: string;
} 