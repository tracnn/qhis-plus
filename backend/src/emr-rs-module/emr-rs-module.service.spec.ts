import { Test, TestingModule } from '@nestjs/testing';
import { EmrRsModuleService } from './emr-rs-module.service';

describe('EmrRsModuleService', () => {
  let service: EmrRsModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmrRsModuleService],
    }).compile();

    service = module.get<EmrRsModuleService>(EmrRsModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
