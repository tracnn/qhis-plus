import { Test, TestingModule } from '@nestjs/testing';
import { SdaModuleService } from './sda-module.service';

describe('SdaModuleService', () => {
  let service: SdaModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SdaModuleService],
    }).compile();

    service = module.get<SdaModuleService>(SdaModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
