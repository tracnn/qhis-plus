import { Test, TestingModule } from '@nestjs/testing';
import { EmrRsModuleController } from './emr-rs-module.controller';
import { EmrRsModuleService } from './emr-rs-module.service';

describe('EmrRsModuleController', () => {
  let controller: EmrRsModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmrRsModuleController],
      providers: [EmrRsModuleService],
    }).compile();

    controller = module.get<EmrRsModuleController>(EmrRsModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
