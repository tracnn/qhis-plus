import { IQuery } from "@nestjs/cqrs";

export class GetPatientByTreatmentCodeQuery implements IQuery {
    constructor(public readonly treatmentCode: string) { }
}