import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { BaseDto } from "../../common/base.dto";
import { ApiProperty } from "@nestjs/swagger";
import { SERVICE_REQ_STATUS_ID } from "src/constant/common.constant";

export class GetServiceReqByTreatmentIdDto extends BaseDto {
    @ApiProperty({
        description: 'Service req status id',
        example: 0,
        required: false,
    })
    @IsOptional()
    @IsEnum(SERVICE_REQ_STATUS_ID)
    @IsNotEmpty()
    serviceReqStatusId: SERVICE_REQ_STATUS_ID;

    @ApiProperty({
        description: 'Treatment id',
        example: 1,
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    treatmentId: number;
}
