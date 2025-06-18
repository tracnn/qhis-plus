import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetClinicSpecialtyQuery } from "./get-clinic-specialty.query";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ClinicSpecialty } from "../entities/clinic-specialty.entity";
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT } from "src/constant/common.constant";
import { Specialty } from "../../specialty/entities/specialty.entity";
import { GetClinicsByIdsQuery } from "../../his-rs-module/queries/get-clinics-by-ids.query";
import { buildPagination } from "@common/pagination.util";
import { GetSpecialtiesByIdsQuery } from "src/specialty/queries/get-specialties-by-ids.query";

@QueryHandler(GetClinicSpecialtyQuery)
export class GetClinicSpecialtyHandler implements IQueryHandler<GetClinicSpecialtyQuery> {
    constructor(
        @InjectRepository(ClinicSpecialty) private readonly clinicSpecialtyRepository: Repository<ClinicSpecialty>,
        private readonly queryBus: QueryBus,
    ) {}

    async execute(query: GetClinicSpecialtyQuery): Promise<any> {
        const { dto } = query;

        const mappings = await this.clinicSpecialtyRepository.find({
            where: { isActive: true },
        });
        
        if (!mappings.length) {
            return [];
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
            data
        };
    }
}