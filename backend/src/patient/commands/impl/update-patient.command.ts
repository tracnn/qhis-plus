import { IsString, IsDateString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdatePatientCommand {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsOptional()
    fullName?: string;

    @IsDateString()
    @IsOptional()
    dateOfBirth?: string;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    constructor(partial: Partial<UpdatePatientCommand>) {
        Object.assign(this, partial);
    }
} 