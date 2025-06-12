import { Test, TestingModule } from '@nestjs/testing';
import { PatientCommandService } from './patient-command.service';

describe('PatientCommandService', () => {
  let service: PatientCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientCommandService],
    }).compile();

    service = module.get<PatientCommandService>(PatientCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
