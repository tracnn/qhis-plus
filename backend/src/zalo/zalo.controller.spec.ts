import { Test, TestingModule } from '@nestjs/testing';
import { ZaloController } from './zalo.controller';

describe('ZaloController', () => {
  let controller: ZaloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZaloController],
    }).compile();

    controller = module.get<ZaloController>(ZaloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
