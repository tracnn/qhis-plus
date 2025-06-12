import { IQuery } from "@nestjs/cqrs";

export class CheckTreatmentFinishedByTreatmentCodeQuery implements IQuery {
    constructor(public readonly treatmentCode: string) {}
}