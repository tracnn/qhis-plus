import { IQuery } from "@nestjs/cqrs";

export class GetTreatmentByTreatmentIdQuery implements IQuery {
    constructor(public readonly treatmentId: number) {}
}

