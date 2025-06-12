import { Test, TestingModule } from '@nestjs/testing';
import { AcsModuleService } from './acs-module.service';

describe('AcsModuleService', () => {
  let service: AcsModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcsModuleService],
    }).compile();

    service = module.get<AcsModuleService>(AcsModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
