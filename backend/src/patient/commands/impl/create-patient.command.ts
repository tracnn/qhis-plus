import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePatientCommand {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsDateString()
    dateOfBirth: string;

    @IsString()
    gender: string;

    @IsString()
    address: string;

    @IsString()
    phoneNumber: string;

    constructor(partial: Partial<CreatePatientCommand>) {
        Object.assign(this, partial);
    }
} 