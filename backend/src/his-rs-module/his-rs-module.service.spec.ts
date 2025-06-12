import { Test, TestingModule } from '@nestjs/testing';
import { HisRsModuleService } from './his-rs-module.service';

describe('HisRsModuleService', () => {
  let service: HisRsModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HisRsModuleService],
    }).compile();

    service = module.get<HisRsModuleService>(HisRsModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
