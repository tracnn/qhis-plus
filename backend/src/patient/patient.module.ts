import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PatientCommandService } from './commands/handlers/patient-command.service';
import { PatientQueryService } from './queries/handlers/patient-query.service';

@Module({
  providers: [PatientService, PatientCommandService, PatientQueryService],
  controllers: [PatientController]
})
export class PatientModule { }
