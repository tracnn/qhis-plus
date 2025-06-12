import { Test, TestingModule } from '@nestjs/testing';
import { HisRsModuleController } from './his-rs-module.controller';
import { HisRsModuleService } from './his-rs-module.service';

describe('HisRsModuleController', () => {
  let controller: HisRsModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HisRsModuleController],
      providers: [HisRsModuleService],
    }).compile();

    controller = module.get<HisRsModuleController>(HisRsModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
