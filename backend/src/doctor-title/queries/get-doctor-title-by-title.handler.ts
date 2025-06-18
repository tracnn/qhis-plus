import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetDoctorTitleByTitleQuery } from "./get-doctor-title-by-title.query";
import { DoctorTitle } from "../entities/doctor-title.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "@common/error-messages/error-404";
import { GetTitleByIdsQuery } from "../../title/queries/get-title-by-ids.query";
import { GetDoctorsByIdsQuery } from "../../his-rs-module/queries/get-doctors-by-ids.query";

@QueryHandler(GetDoctorTitleByTitleQuery)
export class GetDoctorTitleByTitleQueryHandler implements IQueryHandler<GetDoctorTitleByTitleQuery> {
  constructor(
    @InjectRepository(DoctorTitle)
    private readonly doctorTitleRepository: Repository<DoctorTitle>,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: GetDoctorTitleByTitleQuery): Promise<any> {

    const { titleId } = query.dto;
    const whereClause = titleId ? { titleId } : {};
    const doctorTitles = await this.doctorTitleRepository.find({ where: whereClause });

    if (!doctorTitles.length) return { data: [] };

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