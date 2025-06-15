import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetSatisfactionSurveyTreatmentByTreatmentCodeDto {
    @ApiProperty({
        description: 'treatmentCode required',
        example: '123456789012',
    })
    @IsNotEmpty()
    @IsString()
    treatmentCode: string;

    @ApiProperty({
        description: 'serviceReqCode optional',
        required: false,
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    serviceReqCode: string;
}