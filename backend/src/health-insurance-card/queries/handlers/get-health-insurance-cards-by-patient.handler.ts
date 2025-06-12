import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetHealthInsuranceCardsByPatientQuery } from '../impl/get-health-insurance-cards-by-patient.query';
import { HealthInsuranceCardService } from '../../health-insurance-card.service';
import { HealthInsuranceCard } from '../../health-insurance-card.entity';

@QueryHandler(GetHealthInsuranceCardsByPatientQuery)
export class GetHealthInsuranceCardsByPatientHandler implements IQueryHandler<GetHealthInsuranceCardsByPatientQuery> {
    constructor(private readonly service: HealthInsuranceCardService) {}

    async execute(query: GetHealthInsuranceCardsByPatientQuery): Promise<HealthInsuranceCard | null> {
        return null;
    }
} 