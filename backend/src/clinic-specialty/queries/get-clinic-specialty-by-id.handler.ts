import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetClinicSpecialtyByIdQuery } from "./get-clinic-specialty-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { ClinicSpecialty } from "../entities/clinic-specialty.entity";
import { Repository } from "typeorm";
import { ERROR_404 } from "@common/error-messages/error-404";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetClinicSpecialtyByIdQuery)
export class GetClinicSpecialtyByIdHandler implements IQueryHandler<GetClinicSpecialtyByIdQuery> {
    constructor(
        @InjectRepository(ClinicSpecialty) private readonly clinicSpecialtyRepository: Repository<ClinicSpecialty>,
    ) {}

    async execute(query: GetClinicSpecialtyByIdQuery): Promise<any> {
        const { id } = query;

        const clinicSpecialty = await this.clinicSpecialtyRepository.findOne({ where: { id } });
        if (!clinicSpecialty) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_CLINIC_SPECIALTY);
        }
        
        return clinicSpecialty;
    }
}