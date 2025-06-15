import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetHistoryByIdentityQuery } from './queries/get-history-by-identity.query';
import { GetHistoryByIdentityDto } from './dto/get-history-by-identity.dto';
import { GetServiceReqByTreatmentIdDto } from './dto/get-service-req-by-treatment-id.dto';
import { GetServiceReqByTreatmentIdQuery } from './queries/get-service-req-by-treatment-id.query';
import { GetClinicalPrescriptionByTreatmentIdQuery } from './queries/get-clinical-prescription-by-treatment-id.query';
import { GetClinicalPrescriptionByTreatmentIdDto } from './dto/get-clinical-prescription-by-treatment-id.dto';
import { GetMedicalExpensesByTreatmentIdQuery } from './queries/get-medical-expenses-by-treatment-id.query';
import { GetMedicalExpensesByTreatmentIdDto } from './dto/get-medical-expenses-by-treatment-id.dto';
import { GetPacsLinkByTreatmentIdQuery } from './queries/get-pacs-link-by-treatment-id.query';
import { GetPacsLinkByTreatmentIdDto } from './dto/get-pacs-link-by-treatment-id.dto';
import { GetPatientTypesDto } from './dto/get-patient-types.dto';
import { GetPatientTypesQuery } from './queries/get-patient-types.query';
import { GetBranchDto } from './dto/get-branch.dto';
import { GetBranchQuery } from './queries/get-branch.query';
import { GetDoctorsDto } from './dto/get-doctors.dto';
import { GetDoctorsQuery } from './queries/get-doctors.query';
import { GetClinicsDto } from './dto/get-clinics.dto';
import { GetClinicsQuery } from './queries/get-clinics.query';
import { GetClinicQuery } from './queries/get-clinic.query';
import { GetDoctorQuery } from './queries/get-doctor.query';
import { GetDoctorsByIdsQuery } from './queries/get-doctors-by-ids.query';

@Injectable()
export class HisRsModuleService {
    constructor(private readonly queryBus: QueryBus) { }

    async getHistoryByIdentity(body: GetHistoryByIdentityDto) {
        return this.queryBus.execute(
            new GetHistoryByIdentityQuery(
                body.identityNumber, body.page, body.limit));
    }

    async getServiceReqByTreatmentId(body: GetServiceReqByTreatmentIdDto) {
        return this.queryBus.execute(
            new GetServiceReqByTreatmentIdQuery(body));
    }

    async getClinicalPrescriptionByTreatmentId(body: GetClinicalPrescriptionByTreatmentIdDto) {
        return this.queryBus.execute(
            new GetClinicalPrescriptionByTreatmentIdQuery(body));
    }

    async getMedicalExpensesByTreatmentId(body: GetMedicalExpensesByTreatmentIdDto) {
        return this.queryBus.execute(
            new GetMedicalExpensesByTreatmentIdQuery(body));
    }

    async getPacsLinkByTreatmentId(body: GetPacsLinkByTreatmentIdDto) {
        return this.queryBus.execute(
            new GetPacsLinkByTreatmentIdQuery(body));
    }

    async getPatientTypes(body: GetPatientTypesDto) {
        return this.queryBus.execute(
            new GetPatientTypesQuery(body));
    }

    async getBranch(body: GetBranchDto) {
        return this.queryBus.execute(
            new GetBranchQuery(body));
    }

    async getDoctors(body: GetDoctorsDto) {
        return this.queryBus.execute(
            new GetDoctorsQuery(body));
    }

    async getDoctor(id: number) {
        return this.queryBus.execute(
            new GetDoctorQuery(id));
    }

    async getDoctorsByIds(ids: string) {
        const doctorIds = ids.split(',').map(Number);
        return this.queryBus.execute(
            new GetDoctorsByIdsQuery(doctorIds));
    }

    async getClinics(body: GetClinicsDto) {
        return this.queryBus.execute(
            new GetClinicsQuery(body));
    }

    async getClinic(id: number) {
        return this.queryBus.execute(
            new GetClinicQuery(id));
    }
}
