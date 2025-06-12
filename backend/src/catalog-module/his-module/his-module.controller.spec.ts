import { Test, TestingModule } from '@nestjs/testing';
import { HisModuleController } from './his-module.controller';
import { HisModuleService } from './his-module.service';

describe('HisModuleController', () => {
  let controller: HisModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HisModuleController],
      providers: [HisModuleService],
    }).compile();

    controller = module.get<HisModuleController>(HisModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
