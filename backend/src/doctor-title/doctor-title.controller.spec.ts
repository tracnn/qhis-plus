import { Test, TestingModule } from '@nestjs/testing';
import { DoctorTitleController } from './doctor-title.controller';
import { DoctorTitleService } from './doctor-title.service';

describe('DoctorTitleController', () => {
  let controller: DoctorTitleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorTitleController],
      providers: [DoctorTitleService],
    }).compile();

    controller = module.get<DoctorTitleController>(DoctorTitleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
