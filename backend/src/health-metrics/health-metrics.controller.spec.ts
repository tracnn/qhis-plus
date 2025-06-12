import { Test, TestingModule } from '@nestjs/testing';
import { HealthMetricsController } from './health-metrics.controller';
import { HealthMetricsService } from './health-metrics.service';

describe('HealthMetricsController', () => {
  let controller: HealthMetricsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthMetricsController],
      providers: [HealthMetricsService],
    }).compile();

    controller = module.get<HealthMetricsController>(HealthMetricsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
