import { IQuery } from "@nestjs/cqrs";

export class GetDoctorsByIdsQuery implements IQuery {
    constructor(public readonly doctorIds: number[]) {}
}