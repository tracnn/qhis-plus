import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetAppointmentSlotQuery } from "./get-appointment-slot.query";
import { AppointmentSlot } from "../entities/appointment-slot.entity";
import { MoreThanOrEqual, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PAGE_DEFAULT, LIMIT_DEFAULT } from "../../constant/common.constant";
import { buildPagination } from "@common/pagination.util";
import { GetDoctorsByIdsQuery } from "src/his-rs-module/queries/get-doctors-by-ids.query";
import { GetClinicsByIdsQuery } from "src/his-rs-module/queries/get-clinics-by-ids.query";

@QueryHandler(GetAppointmentSlotQuery)
export class GetAppointmentSlotQueryHandler implements IQueryHandler<GetAppointmentSlotQuery> {
  constructor(
    @InjectRepository(AppointmentSlot)
    private readonly appointmentSlotRepository: Repository<AppointmentSlot>,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: GetAppointmentSlotQuery): Promise<any> {
    const { getAppointmentSlotDto } = query;

    const { page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = getAppointmentSlotDto;
    const skip = (page - 1) * limit;

    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10); // "YYYY-MM-DD"
    const nowTime = today.toTimeString().slice(0, 5);  // "HH:mm"

    const condition = `
      slot.isActive = :active
      AND (
        slot.slotDate > :todayAfter
        OR (slot.slotDate = :todayEqual AND slot.slotTime >= :nowTime)
      )
    `;

    const params = {
      active: true,
      todayAfter: todayStr,
      todayEqual: todayStr,
      nowTime: nowTime,
    };

    const qb = this.appointmentSlotRepository.createQueryBuilder("slot")
      .where(condition, params)
      .skip(skip)
      .take(limit);

    const [appointmentSlots, total] = await qb.getManyAndCount();

    const clinicIds = appointmentSlots.map(slot => slot.clinicId);
    const doctorIds = appointmentSlots.map(slot => slot.doctorId);

    const [clinics, doctors] = await Promise.all([
      this.queryBus.execute(new GetClinicsByIdsQuery(clinicIds)),
      this.queryBus.execute(new GetDoctorsByIdsQuery(doctorIds)),
    ]);

    const clinicMap = new Map(clinics.map((c: any) => [Number(c.id), c]));
    const doctorMap = new Map(doctors.map((d: any) => [Number(d.id), d]));

    const data = appointmentSlots.map(slot => ({
      ...slot,
      ...(clinicMap.get(Number(slot.clinicId)) || null),
      ...(doctorMap.get(Number(slot.doctorId)) || null),
    }));

    return {
      data,
      pagination: buildPagination(page, limit, total),
    };
  }
}