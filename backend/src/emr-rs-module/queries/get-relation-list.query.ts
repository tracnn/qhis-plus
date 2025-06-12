import { IQuery } from "@nestjs/cqrs";
import { GetRelationListDto } from "../dto/get-relation-list.dto";

export class GetRelationListQuery implements IQuery {
    constructor(public readonly dto: GetRelationListDto) {}
}