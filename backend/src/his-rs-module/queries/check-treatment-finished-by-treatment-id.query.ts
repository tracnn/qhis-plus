import { IQuery } from "@nestjs/cqrs";

export class CheckTreatmentFinishedByTreatmentIdQuery implements IQuery {
    constructor(public readonly treatmentId: number) {}
}