import { BaseDto } from "../../common/base.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetlHealthMetricsDto extends BaseDto {
    @ApiProperty({
        description: 'Optional: The family member id',
        required: false,
    })
    @IsOptional()
    @IsString()   
    familyMemberId?: string;
}