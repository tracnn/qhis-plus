import { Injectable } from '@nestjs/common';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePersonalHealthMetricCommand } from './commands/create-personal-health-metric.command';
import { GetlHealthMetricsQuery } from './queries/get-health-metrics.query';
import { GetlHealthMetricsDto } from './dto/get-health-metrics.dto';
import { CreatePersonalHeathMetricDto } from './dto/create-personal-heath-metric.dto';
import { CreateFamilyHealthMetricCommand } from './commands/create-family-health-metric.command';
import { CreateFamilyHealthMetricDto } from './dto/create-family-health-metric.dto';
import { UpdateHealthMetricCommand } from './commands/update-health-metric.command';
import { UpdateHealthMetricDto } from './dto/update-health-metric.dto';
import { DeleteHealthMetricCommand } from './commands/delete-health-metric.command';
import { GetHealthMetricByIdQuery } from './queries/get-health-metric-by-id.query';

@Injectable()
export class HealthMetricsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  createPersonalHealthMetric(userId: string, createPersonalHealthMetricDto: CreatePersonalHeathMetricDto) {
    return this.commandBus.execute(new CreatePersonalHealthMetricCommand(userId, createPersonalHealthMetricDto));
  }


  createFamilyHealthMetric(userId: string, createFamilyHealthMetricDto: CreateFamilyHealthMetricDto) {
    return this.commandBus.execute(new CreateFamilyHealthMetricCommand(userId, createFamilyHealthMetricDto));
  }

  findAlllHealthMetrics(userId: string, getlHealthMetricsDto: GetlHealthMetricsDto) {
    return this.queryBus.execute(new GetlHealthMetricsQuery(userId, getlHealthMetricsDto));
  }

  updateHealthMetric(userId: string, metricId: string, updateHealthMetricDto: UpdateHealthMetricDto) {
    return this.commandBus.execute(new UpdateHealthMetricCommand(userId, metricId, updateHealthMetricDto));
  }

  deleteHealthMetric(userId: string, metricId: string) {
    return this.commandBus.execute(new DeleteHealthMetricCommand(userId, metricId));
  }

  getHealthMetricById(userId: string, metricId: string) {
    return this.queryBus.execute(new GetHealthMetricByIdQuery(userId, metricId));
  }
}
