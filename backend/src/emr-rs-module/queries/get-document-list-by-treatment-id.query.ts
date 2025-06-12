import { IQuery } from "@nestjs/cqrs";
import { GetDocumentListByTreatmentIdDto } from "../dto/get-document-list-by-treatment-id.dto";

export class GetDocumentListByTreatmentIdQuery implements IQuery {
    constructor(
        public readonly getDocumentListByTreatmentIdDto: GetDocumentListByTreatmentIdDto
    ) {}
}