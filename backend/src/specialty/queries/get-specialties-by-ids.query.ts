import { IQuery } from "@nestjs/cqrs";

export class GetSpecialtiesByIdsQuery implements IQuery {
    constructor(public readonly specialtyIds: string[]) {}
}