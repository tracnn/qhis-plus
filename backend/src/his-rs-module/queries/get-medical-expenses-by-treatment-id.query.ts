import { IQuery } from "@nestjs/cqrs";
import { GetMedicalExpensesByTreatmentIdDto } from "../dto/get-medical-expenses-by-treatment-id.dto";

export class GetMedicalExpensesByTreatmentIdQuery implements IQuery {
    constructor(
        public readonly dto: GetMedicalExpensesByTreatmentIdDto
    ) {}
}