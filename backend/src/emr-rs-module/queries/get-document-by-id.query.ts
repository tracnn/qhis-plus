import { IQuery } from "@nestjs/cqrs";
import { GetDocumentByIdDto } from "../dto/get-document-by-id.dto";

export class GetDocumentByIdQuery implements IQuery {
    constructor(public readonly getDocumentByIdDto: GetDocumentByIdDto) {}
}

