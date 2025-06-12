import { Test, TestingModule } from '@nestjs/testing';
import { AcsModuleController } from './acs-module.controller';
import { AcsModuleService } from './acs-module.service';

describe('AcsModuleController', () => {
  let controller: AcsModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcsModuleController],
      providers: [AcsModuleService],
    }).compile();

    controller = module.get<AcsModuleController>(AcsModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
