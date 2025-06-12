import { Test, TestingModule } from '@nestjs/testing';
import { PatientQueryService } from './patient-query.service';

describe('PatientQueryService', () => {
  let service: PatientQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientQueryService],
    }).compile();

    service = module.get<PatientQueryService>(PatientQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
