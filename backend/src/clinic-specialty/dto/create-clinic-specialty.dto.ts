import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateClinicSpecialtyDto {
    @ApiProperty({
        description: 'Clinic ID',
        example: 1,
    })
    
    @IsNotEmpty()
    @IsNumber()
    clinicId: number;

    @ApiProperty({
        description: 'Specialty ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    specialtyId: string;
}
