import { IQuery } from "@nestjs/cqrs";

export class GetClinicsByIdsQuery implements IQuery {
    constructor(public readonly clinicIds: number[]) {}
}