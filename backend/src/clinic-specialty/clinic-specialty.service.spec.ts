import { Test, TestingModule } from '@nestjs/testing';
import { ClinicSpecialtyService } from './clinic-specialty.service';

describe('ClinicSpecialtyService', () => {
  let service: ClinicSpecialtyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicSpecialtyService],
    }).compile();

    service = module.get<ClinicSpecialtyService>(ClinicSpecialtyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
