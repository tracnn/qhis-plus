import { IQuery } from "@nestjs/cqrs";
import { GetPacsLinkByTreatmentIdDto } from "../dto/get-pacs-link-by-treatment-id.dto";

export class GetPacsLinkByTreatmentIdQuery implements IQuery {
    constructor(public readonly body: GetPacsLinkByTreatmentIdDto) {}
}