import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetClinicSpecialtyQuery } from "./get-clinic-specialty.query";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ClinicSpecialty } from "../entities/clinic-specialty.entity";
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT } from "src/constant/common.constant";
import { Specialty } from "../../specialty/entities/specialty.entity";
import { GetClinicsByIdsQuery } from "../../his-rs-module/queries/get-clinics-by-ids.query";
import { buildPagination } from "@common/pagination.util";

@QueryHandler(GetClinicSpecialtyQuery)
export class GetClinicSpecialtyHandler implements IQueryHandler<GetClinicSpecialtyQuery> {
    constructor(
        @InjectRepository(ClinicSpecialty) private readonly clinicSpecialtyRepository: Repository<ClinicSpecialty>,
        private readonly queryBus: QueryBus,
    ) {}

    async execute(query: GetClinicSpecialtyQuery): Promise<any> {
        const { dto } = query;

        const { page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = dto;

        const skip = (page - 1) * limit;
        const [mappings, total] = await this.clinicSpecialtyRepository.findAndCount({
            skip,
            take: limit,
            where: { isActive: true },
        });
        if (!mappings.length) {
            return { data: [], pagination: { page, limit, total: 0 } };
        }

        const clinicIds = mappings.map(m => m.clinicId);

        const clinics = await this.queryBus.execute(new GetClinicsByIdsQuery(clinicIds));

        const clinicMap = new Map(clinics.map((c: any) => [Number(c.id), c]));

        const data = mappings.map(m => ({
            ...m,
            clinic: clinicMap.get(Number(m.clinicId)) || null,
        }));
    
        return {
            data,
            pagination: buildPagination(total, page, limit),
        };
    }
}