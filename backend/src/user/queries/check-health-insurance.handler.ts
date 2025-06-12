import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HealthInsuranceCardService } from '../../health-insurance-card/health-insurance-card.service';
import { CheckHealthInsuranceQuery } from './check-health-insurance.query';

@QueryHandler(CheckHealthInsuranceQuery)
export class CheckHealthInsuranceHandler implements IQueryHandler<CheckHealthInsuranceQuery> {
    constructor(
        private readonly healthInsuranceCardService: HealthInsuranceCardService,
    ) {}

    async execute(query: CheckHealthInsuranceQuery): Promise<any> {
        const checkDto = {
            identityNumber: query.validateDto.identityNumber,
            fullName: query.validateDto.fullName,
            birthDate: query.validateDto.birthDate,
        };
        return await this.healthInsuranceCardService.check(checkDto);
    }
}