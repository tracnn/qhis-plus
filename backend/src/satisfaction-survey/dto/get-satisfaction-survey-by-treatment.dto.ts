import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetSatisfactionSurveyTreatmentByTreatmentCodeDto {
    @ApiProperty({
        description: "The treatment code",
        example: "123",
    })
    @IsString()
    @IsNotEmpty()
    treatmentCode: string;
}