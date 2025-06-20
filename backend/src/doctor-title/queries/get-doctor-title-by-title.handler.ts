import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetDoctorTitleByTitleQuery } from "./get-doctor-title-by-title.query";
import { DoctorTitle } from "../entities/doctor-title.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { GetTitleByIdsQuery } from "../../title/queries/get-title-by-ids.query";
import { GetDoctorsByIdsQuery } from "../../his-rs-module/queries/get-doctors-by-ids.query";
import { GetDoctorIdsFromAppointmentSlotQuery } from "../../appointment/queries/get-doctor-ids-from-appointment-slot.query";
import { In } from "typeorm";
import { GetSpecialtiesByIdsQuery } from "../../specialty/queries/get-specialties-by-ids.query";
import { PAGE_DEFAULT, LIMIT_DEFAULT } from "../../constant/common.constant";
import { buildPagination } from "@common/pagination.util";

@QueryHandler(GetDoctorTitleByTitleQuery)
export class GetDoctorTitleByTitleQueryHandler implements IQueryHandler<GetDoctorTitleByTitleQuery> {
  constructor(
    @InjectRepository(DoctorTitle)
    private readonly doctorTitleRepository: Repository<DoctorTitle>,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: GetDoctorTitleByTitleQuery): Promise<any> {

    const { titleId, page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = query.dto;
    const doctorActiveIds = await this.queryBus.execute(new GetDoctorIdsFromAppointmentSlotQuery());

    if (!doctorActiveIds.length) return [];

    const whereClause = titleId ? { titleId, doctorId: In(doctorActiveIds) } : { doctorId: In(doctorActiveIds) };
    const [doctorTitles, count] = await this.doctorTitleRepository.findAndCount({ 
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
    });

    if (!doctorTitles.length) return [];

    const doctorIds = doctorTitles.map(doctorTitle => doctorTitle.doctorId);
    const titleIds = doctorTitles.map(doctorTitle => doctorTitle.titleId);
    const specialtyIds = doctorTitles.map(doctorTitle => doctorTitle.specialtyId);

    const [doctors, titles, specialties] = await Promise.all([
        this.queryBus.execute(new GetDoctorsByIdsQuery(doctorIds)),
        this.queryBus.execute(new GetTitleByIdsQuery(titleIds)),
        this.queryBus.execute(new GetSpecialtiesByIdsQuery(specialtyIds)),
    ]);

    const doctorMap = new Map(doctors.map((d: any) => [Number(d.doctorId), d]));
    const titleMap = new Map(titles.map((t: any) => [String(t.titleId), t]));
    const specialtyMap = new Map(specialties.map((s: any) => [String(s.specialtyId), s]));

    const data = doctorTitles.map(dt => ({
        ...dt,
        ...(doctorMap.get(Number(dt.doctorId)) || null),
        ...(titleMap.get(String(dt.titleId)) || null),
        ...(specialtyMap.get(String(dt.specialtyId)) || null),
    }));

    return {
      data,
      pagination: buildPagination(page, limit, count),
    };
  }
}