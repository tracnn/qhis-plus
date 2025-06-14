import { Test, TestingModule } from '@nestjs/testing';
import { DoctorTitleService } from './doctor-title.service';

describe('DoctorTitleService', () => {
  let service: DoctorTitleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorTitleService],
    }).compile();

    service = module.get<DoctorTitleService>(DoctorTitleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
