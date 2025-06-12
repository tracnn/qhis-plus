import { MESSAGE_COMMON } from "@common/message.common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateSatisfactionSurveyDto {
    
    @ApiProperty({ description: 'Patient code', example: '1234567890' })
    @IsString()
    @IsNotEmpty({ message: MESSAGE_COMMON.PATIENT_CODE_NOT_EMPTY })
    patientCode: string;

    @ApiProperty({ description: 'Treatment code', example: '1234567890' })
    @IsString()
    @IsNotEmpty({ message: MESSAGE_COMMON.TREATMENT_CODE_NOT_EMPTY })
    treatmentCode: string;

    @ApiProperty({ description: 'Service request code', example: '1234567890' })
    @IsString()
    @IsOptional()
    serviceReqCode: string;

    @ApiProperty({ description: 'Survey score', example: 5 })
    @IsInt({ message: MESSAGE_COMMON.SURVEY_SCORE_IS_INT })
    @IsNotEmpty({ message: MESSAGE_COMMON.SURVEY_SCORE_NOT_EMPTY })
    @Min(1, { message: MESSAGE_COMMON.SURVEY_SCORE_MIN })
    @Max(5, { message: MESSAGE_COMMON.SURVEY_SCORE_MAX })
    surveyScore: number;

    @ApiProperty({ description: 'Survey comment', example: 'Good service' })
    @IsString({ message: MESSAGE_COMMON.SURVEY_COMMENT_IS_STRING })
    @IsOptional()
    @MaxLength(255, { message: MESSAGE_COMMON.SURVEY_COMMENT_MAX_LENGTH })
    surveyComment: string;
}
