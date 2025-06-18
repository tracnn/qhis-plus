import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsUUID } from "class-validator";
import { Type } from "class-transformer";

export class GetAppointmentSlotBySpecialtyDto {
    @ApiProperty({
        description: 'Optional specialtyId',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    specialtyId: string;

    @ApiProperty({
        description: 'Optional clinicId',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    clinicId: number;

    @ApiProperty({
        description: 'Optional doctorId',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    doctorId: number;

    @ApiProperty({
        description: 'Optional slotDate',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    slotDate: string;
}