import { IQuery } from "@nestjs/cqrs";
import { GetPatientByIdentityDto } from "../dto/get-patient-by-identity.dto";

export class GetPatientByIdentityQuery implements IQuery {
    constructor(public readonly body: GetPatientByIdentityDto) { }
}