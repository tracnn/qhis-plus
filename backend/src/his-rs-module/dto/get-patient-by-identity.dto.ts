import { IsNotEmpty, IsString } from "class-validator";
import { BaseDto } from "../../common/base.dto";

export class GetPatientByIdentityDto extends BaseDto {
    @IsString({ message: 'identityNumber must be a string' })
    @IsNotEmpty({ message: 'identityNumber is required' })
    identityNumber: string;

    @IsString({ message: 'insuranceNumber must be a string' })
    @IsNotEmpty({ message: 'insuranceNumber is required' })
    insuranceNumber: string;
}