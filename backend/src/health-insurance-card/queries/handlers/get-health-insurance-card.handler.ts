import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetHealthInsuranceCardQuery } from '../impl/get-health-insurance-card.query';
import { HealthInsuranceCardService } from '../../health-insurance-card.service';
import { HealthInsuranceCard } from '../../health-insurance-card.entity';

@QueryHandler(GetHealthInsuranceCardQuery)
export class GetHealthInsuranceCardHandler implements IQueryHandler<GetHealthInsuranceCardQuery> {
    constructor(private readonly service: HealthInsuranceCardService) {}

    async execute(query: GetHealthInsuranceCardQuery): Promise<HealthInsuranceCard | null> {
        return await this.service.findById(query.id);
    }
} 