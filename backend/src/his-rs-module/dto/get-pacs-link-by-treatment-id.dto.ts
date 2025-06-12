import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { IsNotEmpty } from "class-validator";
import { BaseDto } from "src/common/base.dto";

export class GetPacsLinkByTreatmentIdDto extends BaseDto {
    @ApiProperty({ description: 'Treatment ID' })
    @IsNumber()
    @IsNotEmpty()
    treatmentId: number;
}