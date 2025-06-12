import { Test, TestingModule } from '@nestjs/testing';
import { SdaModuleController } from './sda-module.controller';
import { SdaModuleService } from './sda-module.service';

describe('SdaModuleController', () => {
  let controller: SdaModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SdaModuleController],
      providers: [SdaModuleService],
    }).compile();

    controller = module.get<SdaModuleController>(SdaModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
