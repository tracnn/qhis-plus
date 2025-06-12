import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { HealthInsuranceCard } from './health-insurance-card.entity';
import { HealthInsuranceCardController } from './health-insurance-card.controller';
import { HealthInsuranceCardService } from './health-insurance-card.service';
import { HealthInsuranceCardRepository } from './repository/health-insurance-card.repository';
import { CreateHealthInsuranceCardHandler } from './commands/handlers/create-health-insurance-card.handler';
import { GetHealthInsuranceCardHandler } from './queries/handlers/get-health-insurance-card.handler';
import { GetHealthInsuranceCardsByPatientHandler } from './queries/handlers/get-health-insurance-cards-by-patient.handler';
import { ApiBhxhService } from './services/api.bhxh.service';

const CommandHandlers = [CreateHealthInsuranceCardHandler];
const QueryHandlers = [GetHealthInsuranceCardHandler, GetHealthInsuranceCardsByPatientHandler];

@Module({
    imports: [
        TypeOrmModule.forFeature([HealthInsuranceCard]),
        CqrsModule,
        HttpModule,
    ],
    controllers: [HealthInsuranceCardController],
    providers: [
        HealthInsuranceCardService,
        HealthInsuranceCardRepository,
        ...CommandHandlers,
        ...QueryHandlers,
        ApiBhxhService,
    ],
    exports: [HealthInsuranceCardService],
})
export class HealthInsuranceCardModule {} 