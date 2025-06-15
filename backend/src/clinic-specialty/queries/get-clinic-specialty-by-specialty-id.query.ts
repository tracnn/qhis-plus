import { IQuery } from "@nestjs/cqrs";
import { GetClinicSpecialtyBySpecialtyIdDto } from "../dto/get-clinic-specialty-by-specialty-id.dto";

export class GetClinicSpecialtyBySpecialtyIdQuery implements IQuery {
    constructor(
        public readonly specialtyId: string,
        public readonly getClinicSpecialtyBySpecialtyIdDto: GetClinicSpecialtyBySpecialtyIdDto,
    ) {}
}