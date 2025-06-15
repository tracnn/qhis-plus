import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetClinicSpecialtyBySpecialtyIdQuery } from "./get-clinic-specialty-by-specialty-id.query";
import { Repository } from "typeorm";
import { ClinicSpecialty } from "../entities/clinic-specialty.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PAGE_DEFAULT, LIMIT_DEFAULT } from "../../constant/common.constant";
import { GetClinicsByIdsQuery } from "../../his-rs-module/queries/get-clinics-by-ids.query";
import { GetSpecialtiesByIdsQuery } from "../../specialty/queries/get-specialties-by-ids.query";
import { buildPagination } from "@common/pagination.util";

@QueryHandler(GetClinicSpecialtyBySpecialtyIdQuery)
export class GetClinicSpecialtyBySpecialtyIdHandler implements IQueryHandler<GetClinicSpecialtyBySpecialtyIdQuery> {
    constructor(
        @InjectRepository(ClinicSpecialty)
        private readonly clinicSpecialtyRepository: Repository<ClinicSpecialty>,
        private readonly queryBus: QueryBus,
    ) {}

    async execute(query: GetClinicSpecialtyBySpecialtyIdQuery): Promise<any> {
        const { specialtyId, getClinicSpecialtyBySpecialtyIdDto } = query;

        const { page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = getClinicSpecialtyBySpecialtyIdDto;

        const skip = (page - 1) * limit;
        const [mappings, total] = await this.clinicSpecialtyRepository.findAndCount({
            skip,
            take: limit,
            where: { specialtyId, isActive: true },
        });

        if (!mappings.length) {
            return { data: [], pagination: { page, limit, total: 0 } };
        }

        const clinicIds = mappings.map(m => m.clinicId);
        const specialtyIds = mappings.map(m => m.specialtyId);

        const [clinics, specialties] = await Promise.all([
            this.queryBus.execute(new GetClinicsByIdsQuery(clinicIds)),
            this.queryBus.execute(new GetSpecialtiesByIdsQuery(specialtyIds))
        ]);

        const clinicMap = new Map(clinics.map((c: any) => [Number(c.id), c]));
        const specialtyMap = new Map(specialties.map((s: any) => [String(s.id), s]));

        const data = mappings.map(m => ({
            ...m,
            clinic: clinicMap.get(Number(m.clinicId)) || null,
            specialty: specialtyMap.get(String(m.specialtyId)) || null,
        }));
    
        return {
            data,
            pagination: buildPagination(page, limit, total),
        };

    }
}