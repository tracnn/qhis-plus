import { ValidateUserDto } from '../dto/validate-user.dto';
export class CheckHealthInsuranceQuery {
    constructor(public readonly validateDto: ValidateUserDto) {}
}