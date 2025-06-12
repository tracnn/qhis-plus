import { Test, TestingModule } from '@nestjs/testing';
import { HisModuleService } from './his-module.service';

describe('HisModuleService', () => {
  let service: HisModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HisModuleService],
    }).compile();

    service = module.get<HisModuleService>(HisModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
