import { Optional } from '@nestjs/common';
import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateHealthInsuranceCardDto {
    @Optional()
    @IsString()
    maLk: string;

    @IsString()
    @IsNotEmpty()
    maKiemTra: string;

    @IsString()
    @IsNotEmpty()
    maKetQua: string;

    @IsString()
    @IsNotEmpty()
    heinCardNumber: string;

    @IsString()
    @IsNotEmpty()
    patientId: string;

    @IsDate()
    @IsNotEmpty()
    issueDate: Date;

    @IsDate()
    @IsNotEmpty()
    expiryDate: Date;

    @IsString()
    @IsNotEmpty()
    insuranceType: string;

    @IsString()
    @IsNotEmpty()
    insuranceCompany: string;

    @IsString()
    @IsNotEmpty()
    status: string;
} 