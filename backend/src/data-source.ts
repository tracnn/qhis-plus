import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { DataSource } from "typeorm";
import { HealthMetric } from "./health-metrics/entities/health-metric.entity";
import { FamilyMember } from "./family-members/entities/family-member.entity";
import { SatisfactionSurvey } from "./satisfaction-survey/entities/satisfaction-survey.entity";
import { SupportRequest } from "./support-request/entities/support-request.entity";
import { User } from "./user/entities/user.entity";
import { Otp } from "./otp/entities/otp.entity";
import { AppointmentSlot } from "./appointment/entities/appointment-slot.entity";
import { ClinicSpecialty } from "./clinic-specialty/entities/clinic-specialty.entity";
import { DoctorTitle } from "./doctor-title/entities/doctor-title.entity";
import { Appointment } from "./appointment/entities/appointment.entity";
import { Specialty } from "./specialty/entities/specialty.entity";
import { Title } from "./title/entities/title.entity";
import { Xml15TuberculosisTreatment } from './bhxh/qd3176/entities/xml15-tuberculosis-treatment.entity';
import { Xml1PatientSummary } from './bhxh/qd3176/entities/xml1-patient-summary.entity';
import { Xml2DrugDetail } from './bhxh/qd3176/entities/xml2-drug-detail.entity';
import { Xml3ServiceDetail } from './bhxh/qd3176/entities/xml3-service-detail.entity';
import { Xml4SubclinicalDetail } from './bhxh/qd3176/entities/xml4-subclinical-detail.entity';
import { Xml5ClinicalProgress } from './bhxh/qd3176/entities/xml5-clinical-progress.entity';
import { Xml6HivCareRecord } from './bhxh/qd3176/entities/xml6-hiv-care-record.entity';
import { Xml7DischargePaper } from './bhxh/qd3176/entities/xml7-discharge-paper.entity';
import { Xml8MedicalRecordSummary } from './bhxh/qd3176/entities/xml8-medical-record-summary.entity';
import { Xml9BirthCertificate } from './bhxh/qd3176/entities/xml9-birth-certificate.entity';
import { Xml10MaternityLeave } from './bhxh/qd3176/entities/xml10-maternity-leave.entity';
import { Xml11SocialInsuranceLeaveCertificate } from './bhxh/qd3176/entities/xml11-social-insurance-leave-certificate.entity';
import { Xml12MedicalAssessment } from './bhxh/qd3176/entities/xml12-medical-assessment.entity';
import { Xml13TransferForm } from './bhxh/qd3176/entities/xml13-transfer-form.entity';
import { Xml14ReexamAppointment } from './bhxh/qd3176/entities/xml14-reexam-appointment.entity';

export default new DataSource({
    type: "oracle",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 1521,
    username: process.env.DB_USERNAME || "HXT_RS",
    password: process.env.DB_PASSWORD || "HXT_RS",
    serviceName: process.env.DB_SERVICE_NAME || "FREEPDB1",
    entities: [
        HealthMetric, 
        User, 
        FamilyMember, 
        SatisfactionSurvey, 
        SupportRequest, 
        Otp,
        Appointment,
        AppointmentSlot,
        ClinicSpecialty,
        DoctorTitle,
        Specialty,
        Title,
        Xml1PatientSummary, 
        Xml2DrugDetail, 
        Xml3ServiceDetail, 
        Xml4SubclinicalDetail, 
        Xml5ClinicalProgress, 
        Xml6HivCareRecord, 
        Xml7DischargePaper, 
        Xml8MedicalRecordSummary, 
        Xml9BirthCertificate, 
        Xml10MaternityLeave, 
        Xml11SocialInsuranceLeaveCertificate, 
        Xml12MedicalAssessment, 
        Xml13TransferForm, 
        Xml14ReexamAppointment, 
        Xml15TuberculosisTreatment     
    ],
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
    synchronize: false,
    migrationsTableName: "MIGRATIONS",
    name: 'default',
});