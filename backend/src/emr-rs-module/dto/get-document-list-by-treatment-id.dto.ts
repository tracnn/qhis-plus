import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "../../common/base.dto";
import { IsNotEmpty, IsNumber } from "class-validator";

export class GetDocumentListByTreatmentIdDto extends BaseDto {
    @ApiProperty({
        description: 'Treatment ID',
        example: 1,
        required: true,
    })
    @IsNotEmpty({ message: 'Treatment ID không được để trống' })
    @IsNumber({}, { message: 'Treatment ID phải là số' })
    treatmentId: number;
}