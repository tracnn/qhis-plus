import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "../../common/base.dto";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class GetAppointmentSlotBySpecialtyDto extends BaseDto {
    @ApiProperty({
        description: 'Optional clinicId',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    clinicId: number;

    @ApiProperty({
        description: 'Optional doctorId',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    doctorId: number;
}