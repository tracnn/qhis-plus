import { IQuery } from "@nestjs/cqrs";
import { GetClinicalPrescriptionByTreatmentIdDto } from "../dto/get-clinical-prescription-by-treatment-id.dto";

export class GetClinicalPrescriptionByTreatmentIdQuery implements IQuery {
    constructor(public readonly dto: GetClinicalPrescriptionByTreatmentIdDto) {}
}