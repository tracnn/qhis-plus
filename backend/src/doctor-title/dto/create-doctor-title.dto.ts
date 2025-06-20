import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateDoctorTitleDto {
    @ApiProperty({
        description: 'The doctor id',
        example: '1',
    })
    @IsNotEmpty()
    @IsNumber()
    doctorId: number;

    @ApiProperty({
        description: 'The title id',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    titleId: string;

    @ApiProperty({
        description: 'The specialty id',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    specialtyId: string;
}
