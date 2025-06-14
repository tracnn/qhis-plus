import { IQuery } from "@nestjs/cqrs";

export class GetClinicSpecialtyByIdQuery implements IQuery {
    constructor(public readonly id: string) {}
}