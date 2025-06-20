import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";
import { BaseDto } from "../../common/base.dto";

export class GetDoctorTitleByTitleDto extends BaseDto {
    
    @ApiProperty({
        description: 'Title ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    titleId: string;
}