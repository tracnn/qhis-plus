import { CreateHealthInsuranceCardDto } from '../../dto/create-health-insurance-card.dto';

export class CreateHealthInsuranceCardCommand {
    constructor(public readonly dto: CreateHealthInsuranceCardDto) {}
} 