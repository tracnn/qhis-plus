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
}
