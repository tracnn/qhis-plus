import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { APPOINTMENT_STATUS } from "../enums/appointment-status.enum";

export class CreateAppointmentDto {
    @ApiProperty({
        description: 'appointmentSlotId required',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    appointmentSlotId: string;

    @ApiProperty({
        description: 'patientId required',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    patientId: string;

    @ApiProperty({
        description: 'symptom',
        example: 'This is a symptom',
    })
    @IsOptional()
    @IsString()
    symptom: string;
}
