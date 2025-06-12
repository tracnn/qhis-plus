import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { SupportRequestType, SupportRequestStatus } from "../enums/support-request.enum";
import { MESSAGE_COMMON } from "@common/message.common";

export class CreateSupportRequestDto {
    @ApiProperty({
        description: 'The code of the patient',
        example: '0000000001',
    })
    @IsString()
    @IsNotEmpty({ message: MESSAGE_COMMON.PATIENT_CODE_NOT_EMPTY })
    patientCode: string;

    @ApiProperty({
        description: 'The code of the treatment',
        example: '000000000001',
    })
    @IsString()
    @IsNotEmpty({ message: MESSAGE_COMMON.TREATMENT_CODE_NOT_EMPTY })
    treatmentCode: string;

    @ApiProperty({
        description: 'The type of the support request',
        example: SupportRequestType.TECHNICAL_SUPPORT,
    })
    @IsString()
    @IsNotEmpty({ message: MESSAGE_COMMON.REQUEST_TYPE_NOT_EMPTY })
    @IsEnum(SupportRequestType)
    requestType: SupportRequestType;

    @ApiProperty({
        description: 'The content of the support request',
        example: 'Support Request Content',
    })
    @IsOptional()
    @IsString()
    requestContent?: string;

}
