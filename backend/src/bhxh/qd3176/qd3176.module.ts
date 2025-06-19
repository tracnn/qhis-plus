import { Module } from '@nestjs/common';
import { Qd3176Service } from './qd3176.service';
import { Qd3176Controller } from './qd3176.controller';
import { Xml1PatientSummary } from './entities/xml1-patient-summary.entity';
import { Xml2DrugDetail } from './entities/xml2-drug-detail.entity';
import { Xml3ServiceDetail } from './entities/xml3-service-detail.entity';
import { Xml4SubclinicalDetail } from './entities/xml4-subclinical-detail.entity';
import { Xml14ReexamAppointment } from './entities/xml14-reexam-appointment.entity';
import { Xml15TuberculosisTreatment } from './entities/xml15-tuberculosis-treatment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BASE_SCHEMA } from '../../constant/common.constant';
import { CqrsModule } from '@nestjs/cqrs';
import { Xml6HivCareRecord } from './entities/xml6-hiv-care-record.entity';
import { Xml5ClinicalProgress } from './entities/xml5-clinical-progress.entity';
import { Xml8MedicalRecordSummary } from './entities/xml8-medical-record-summary.entity';
import { Xml9BirthCertificate } from './entities/xml9-birth-certificate.entity';
import { Xml10MaternityLeave } from './entities/xml10-maternity-leave.entity';
import { Xml11InsuranceLeave } from './entities/xml11-insurance-leave.entity';
import { Xml12MedicalAssessment } from './entities/xml12-medical-assessment.entity';
import { Xml13TransferForm } from './entities/xml13-transfer-form.entity';
import { Xml7DischargePaper } from './entities/xml7-discharge-paper.entity';
import { XmlImportService } from './services/xml-import.service';
import { CreateFullXmlRecordHandler } from './commands/create-full-xml-record.handler';

const CommandHandlers = [CreateFullXmlRecordHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(
    [Xml1PatientSummary, Xml2DrugDetail, Xml3ServiceDetail, 
      Xml4SubclinicalDetail, Xml5ClinicalProgress, Xml6HivCareRecord, 
      Xml7DischargePaper, Xml8MedicalRecordSummary, Xml9BirthCertificate, 
      Xml10MaternityLeave, Xml11InsuranceLeave, Xml12MedicalAssessment, 
      Xml13TransferForm, Xml14ReexamAppointment, Xml15TuberculosisTreatment], BASE_SCHEMA.DEFAULT)],
  controllers: [Qd3176Controller],
  providers: [Qd3176Service, XmlImportService, ...CommandHandlers],
  exports: [CqrsModule],
})
export class Qd3176Module {}
