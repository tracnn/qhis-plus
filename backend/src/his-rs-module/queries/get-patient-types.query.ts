import { GetPatientTypesDto } from "../dto/get-patient-types.dto";
import { IQuery } from "@nestjs/cqrs";

export class GetPatientTypesQuery implements IQuery {
    constructor(public readonly dto: GetPatientTypesDto) {
    }
}