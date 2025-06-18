import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetDoctorTitleQuery } from "./get-doctor-title.query";
import { DoctorTitleService } from "../doctor-title.service";
import { InjectRepository } from "@nestjs/typeorm";
import { DoctorTitle } from "../entities/doctor-title.entity";
import { Repository } from "typeorm";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "src/constant/common.constant";
import { buildPagination } from "@common/pagination.util";
import { GetDoctorsByIdsQuery } from "src/his-rs-module/queries/get-doctors-by-ids.query";
import { GetTitleByIdsQuery } from "src/title/queries/get-title-by-ids.query";

@QueryHandler(GetDoctorTitleQuery)
export class GetDoctorTitleHandler implements IQueryHandler<GetDoctorTitleQuery> {
    constructor(
        @InjectRepository(DoctorTitle)
        private readonly doctorTitleRepository: Repository<DoctorTitle>,
        private readonly queryBus: QueryBus,
    ) {}

    async execute(query: GetDoctorTitleQuery): Promise<any> {
        const { getDoctorTitleDto } = query;

        const doctorTitles = await this.doctorTitleRepository.find({
            where: { isActive: true },
        });

        if (!doctorTitles.length) {
            return [];
        }

        const doctorIds = doctorTitles.map(doctorTitle => doctorTitle.doctorId);
        const titleIds = doctorTitles.map(doctorTitle => doctorTitle.titleId);
        const [doctors, titles] = await Promise.all([
            this.queryBus.execute(new GetDoctorsByIdsQuery(doctorIds)),
            this.queryBus.execute(new GetTitleByIdsQuery(titleIds)),
        ]);

        const doctorMap = new Map(doctors.map((d: any) => [Number(d.id), d]));
        const titleMap = new Map(titles.map((t: any) => [String(t.id), t]));

        const data = doctorTitles.map(dt => ({
            ...dt,
            ...(doctorMap.get(Number(dt.doctorId)) || null),
            ...(titleMap.get(String(dt.titleId)) || null),
        }));

        return { 
            data
        };

    }
}