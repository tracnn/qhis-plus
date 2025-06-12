import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateHealthInsuranceCardCommand } from '../impl/create-health-insurance-card.command';
import { HealthInsuranceCardService } from '../../health-insurance-card.service';
import { HealthInsuranceCard } from '../../health-insurance-card.entity';

@CommandHandler(CreateHealthInsuranceCardCommand)
export class CreateHealthInsuranceCardHandler implements ICommandHandler<CreateHealthInsuranceCardCommand> {
    constructor(private readonly service: HealthInsuranceCardService) {}

    async execute(command: CreateHealthInsuranceCardCommand): Promise<HealthInsuranceCard> {
        return await this.service.create(command.dto);
    }
} 