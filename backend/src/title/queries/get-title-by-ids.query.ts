import { IQuery } from "@nestjs/cqrs";

export class GetTitleByIdsQuery implements IQuery {
    constructor(public readonly titleIds: string[]) {}
}