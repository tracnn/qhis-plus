import { IQuery } from "@nestjs/cqrs";
import { GetClinicSpecialtyDto } from "../dto/get-clinic-specialty.dto";

export class GetClinicSpecialtyQuery implements IQuery {
    constructor(public readonly dto: GetClinicSpecialtyDto) {}
}