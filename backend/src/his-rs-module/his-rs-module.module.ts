import { Module } from '@nestjs/common';
import { HisRsModuleService } from './his-rs-module.service';
import { HisRsModuleController } from './his-rs-module.controller';
import { GetHistoryByIdentityHandler } from './queries/get-history-by-identity.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BASE_SCHEMA } from '../constant/common.constant';
import { HttpModule } from '@nestjs/axios';
import { GetServiceReqByTreatmentIdHandler } from './queries/get-service-req-by-treatment-id.handler';
import { GetClinicalPrescriptionByTreatmentIdHandler } from './queries/get-clinical-prescription-by-treatment-id-handler';
import { GetMedicalExpensesByTreatmentIdHandler } from './queries/get-medical-expenses-by-treatment-id.handler';
import { GetTreatmentByTreatmentIdHandler } from './queries/get-treatment-by-treatment-id.handler';
import { GetPacsLinkByTreatmentIdHandler } from './queries/get-pacs-link-by-treatment-id.handler';
import { GetPatientByIdentityHandler } from './queries/get-patient-by-identity.handler';
import { CheckTreatmentFinishedByTreatmentCodeHandler } from './queries/check-treatment-finished-by-treatment-code.handler';
import { GetPatientByTreatmentCodeHandler } from './queries/get-patient-by-treatment-code.handler';
import { OrganizationConfigService } from '../common/organization-config.service';
import { CheckTreatmentFinishedByTreatmentIdHandler } from './queries/check-treatment-finished-by-treatment-id.handler';
import { GetPatientTypesHandler } from './queries/get-patient-types.handler';
import { GetBranchQueryHandler } from './queries/get-branch.handler';
import { GetDoctorsQueryHandler } from './queries/get-doctors.handler';
import { GetClinicsHandler } from './queries/get-clinics.handler';
import { GetClinicHandler } from './queries/get-clinic.handler';
import { GetDoctorQueryHandler } from './queries/get-doctor.handler';
import { GetClinicsByIdsHandler } from './queries/get-clinics-by-ids.handler';
import { GetDoctorsByIdsHandler } from './queries/get-doctors-by-ids.handler';

const handlers = [
  GetHistoryByIdentityHandler,
  GetServiceReqByTreatmentIdHandler,
  GetClinicalPrescriptionByTreatmentIdHandler,
  GetMedicalExpensesByTreatmentIdHandler,
  GetTreatmentByTreatmentIdHandler,
  GetPacsLinkByTreatmentIdHandler,
  GetPatientByIdentityHandler,
  CheckTreatmentFinishedByTreatmentCodeHandler,
  GetPatientByTreatmentCodeHandler,
  OrganizationConfigService,
  CheckTreatmentFinishedByTreatmentIdHandler,
  GetPatientTypesHandler,
  GetBranchQueryHandler,
  GetDoctorsQueryHandler,
  GetClinicsHandler,
  GetClinicHandler,
  GetDoctorQueryHandler,
  GetClinicsByIdsHandler,
  GetDoctorsByIdsHandler,
]

@Module({
  imports: [
    CqrsModule, 
    TypeOrmModule.forFeature([], BASE_SCHEMA.HIS_RS),
    HttpModule
  ],
  controllers: [HisRsModuleController],
  providers: [HisRsModuleService, 
    ...handlers],
  exports: [CqrsModule],
})
export class HisRsModuleModule {}
