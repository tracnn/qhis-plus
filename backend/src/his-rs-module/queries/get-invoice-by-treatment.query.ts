import { IQuery } from "@nestjs/cqrs";
import { GetInvoiceByTreatmentDto } from "../dto/get-invoice-by-treatment.dto";

export class GetInvoiceByTreatmentQuery implements IQuery {
    constructor(
        public readonly getInvoiceByTreatmentDto: GetInvoiceByTreatmentDto
    ) {}
}