import { Module } from '@nestjs/common';
import { HealthMetricsService } from './health-metrics.service';
import { HealthMetricsController } from './health-metrics.controller';
import { HealthMetric } from './entities/health-metric.entity';
import { BASE_SCHEMA } from '../constant/common.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePersonalHealthMetricHandler } from './commands/create-personal-health-metric.handler';
import { CreateFamilyHealthMetricHandler } from './commands/create-family-health-metric.handler';
import { GetlHealthMetricsHandler } from './queries/get-health-metrics.handler';
import { UpdateHealthMetricCommandHandler } from './commands/update-health-metric.handler';
import { DeleteHealthMetricCommandHandler } from './commands/delete-health-metric.handler';
import { GetHealthMetricByIdQueryHandler } from './queries/get-health-metric-by-id.handler';

const CommandHandlers = [
  CreatePersonalHealthMetricHandler,
  CreateFamilyHealthMetricHandler,
  UpdateHealthMetricCommandHandler,
  DeleteHealthMetricCommandHandler,
];

const QueryHandlers = [
  GetlHealthMetricsHandler,
  GetHealthMetricByIdQueryHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthMetric], BASE_SCHEMA.DEFAULT),
    CqrsModule,
  ],
  controllers: [HealthMetricsController],
  providers: [HealthMetricsService, ...CommandHandlers, ...QueryHandlers],
  exports: [CqrsModule],
})
export class HealthMetricsModule {}
