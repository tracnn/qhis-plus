import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, IsPhoneNumber } from "class-validator";
import { IsString } from "class-validator";
import { BaseDto } from "src/common/base.dto";

export class GetHistoryByIdentityDto extends BaseDto {
    @ApiProperty({
        description: 'Số CCCD/Số BHYT/Số BHXH',
        example: '0123456789',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Length(10, 15)
    identityNumber: string;   
}