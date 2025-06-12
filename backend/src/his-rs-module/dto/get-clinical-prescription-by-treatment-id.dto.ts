import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "../../common/base.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetClinicalPrescriptionByTreatmentIdDto extends BaseDto {
    @ApiProperty({
        description: 'Treatment ID',
        example: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    treatmentId: number;
}