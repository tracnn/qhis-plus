import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetDoctorTitleByDoctorIdsQuery } from "./get-doctor-title-by-doctor-ids.query";
import { In, Repository } from "typeorm";
import { DoctorTitle } from "../entities/doctor-title.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GetTitleByIdsQuery } from "../../title/queries/get-title-by-ids.query";
import { GetDoctorsByIdsQuery } from "../../his-rs-module/queries/get-doctors-by-ids.query";

@QueryHandler(GetDoctorTitleByDoctorIdsQuery)
export class GetDoctorTitleByDoctorIdsHandler implements IQueryHandler<GetDoctorTitleByDoctorIdsQuery> {
  constructor(
    @InjectRepository(DoctorTitle)
    private readonly doctorTitleRepository: Repository<DoctorTitle>,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: GetDoctorTitleByDoctorIdsQuery): Promise<any> {
    const { doctorIds } = query;

    //const doctorIdsArray = doctorIds.map((id: number) => Number(id));
    const doctorTitles = await this.doctorTitleRepository.find({
      where: {
        doctorId: In(doctorIds),
      },
    });

    if (!doctorTitles.length) return { data: [] };
    const titleIds = doctorTitles.map(doctorTitle => doctorTitle.titleId);
    const [doctors, titles] = await Promise.all([
      this.queryBus.execute(new GetDoctorsByIdsQuery(doctorIds)),
      this.queryBus.execute(new GetTitleByIdsQuery(titleIds)),
    ]);
    const doctorMap = new Map(doctors.map((d: any) => [Number(d.doctorId), d]));
    const titleMap = new Map(titles.map((t: any) => [String(t.titleId), t]));
    return doctorTitles.map(dt => ({
      ...dt,
      ...(doctorMap.get(Number(dt.doctorId)) || null),
      ...(titleMap.get(String(dt.titleId)) || null),
    }));
  }
}