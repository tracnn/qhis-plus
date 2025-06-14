import { Test, TestingModule } from '@nestjs/testing';
import { ClinicSpecialtyController } from './clinic-specialty.controller';
import { ClinicSpecialtyService } from './clinic-specialty.service';

describe('ClinicSpecialtyController', () => {
  let controller: ClinicSpecialtyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicSpecialtyController],
      providers: [ClinicSpecialtyService],
    }).compile();

    controller = module.get<ClinicSpecialtyController>(ClinicSpecialtyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
