import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { AppointmentSlot } from "../entities/appointment-slot.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PAGE_DEFAULT, LIMIT_DEFAULT } from "../../constant/common.constant";
import { buildPagination } from "@common/pagination.util";
import { GetDoctorsByIdsQuery } from "src/his-rs-module/queries/get-doctors-by-ids.query";
import { GetClinicsByIdsQuery } from "src/his-rs-module/queries/get-clinics-by-ids.query";
import { GetAppointmentSlotBySpecialtyQuery } from "./get-appointment-slot-by-specialty.query";
import { GetClinicSpecialtyBySpecialtyIdQuery } from "../../clinic-specialty/queries/get-clinic-specialty-by-specialty-id.query";
import { GetClinicSpecialtyBySpecialtyIdDto } from "src/clinic-specialty/dto/get-clinic-specialty-by-specialty-id.dto";
import { APPOINTMENT_STATUS } from "../enums/appointment-status.enum";

@QueryHandler(GetAppointmentSlotBySpecialtyQuery)
export class GetAppointmentSlotBySpecialtyQueryHandler implements IQueryHandler<GetAppointmentSlotBySpecialtyQuery> {
  constructor(
    @InjectRepository(AppointmentSlot)
    private readonly appointmentSlotRepository: Repository<AppointmentSlot>,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: GetAppointmentSlotBySpecialtyQuery): Promise<any> {
    const { specialtyId, dto } = query;

    const activeStatuses = [
      APPOINTMENT_STATUS.PENDING,
      APPOINTMENT_STATUS.CONFIRMED,
      APPOINTMENT_STATUS.CHECKED_IN,
      APPOINTMENT_STATUS.COMPLETED,
    ];

    const { page = PAGE_DEFAULT, limit = LIMIT_DEFAULT, clinicId, doctorId } = dto;
    const skip = (page - 1) * limit;

    const clinicSpecialty = await this.queryBus.execute(
        new GetClinicSpecialtyBySpecialtyIdQuery(specialtyId, new GetClinicSpecialtyBySpecialtyIdDto()));
    const clinicIds = clinicSpecialty.data.map((c: any) => c.clinicId);

    if (!clinicIds.length) {
      return { data: [], pagination: { page, limit, total: 0 } };
    }

    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10); // "YYYY-MM-DD"
    const nowTime = today.toTimeString().slice(0, 5);  // "HH:mm"
    
    const qb = this.appointmentSlotRepository.createQueryBuilder("slot");
    qb.where("slot.isActive = :active", { active: true })
    .andWhere(
        `(slot.slotDate > :todayAfter OR (slot.slotDate = :todayEqual AND slot.slotTime >= :nowTime))`,
        { todayAfter: todayStr, todayEqual: todayStr, nowTime }
    )
    .andWhere("slot.clinicId IN (:...clinicIds)", { clinicIds })
    .skip((page - 1) * limit)
    .take(limit)
    .orderBy("slot.slotDate", "ASC")
    .addOrderBy("slot.slotTime", "ASC");

    // filter by clinicId
    if (clinicId) {
        qb.andWhere("slot.clinicId = :clinicId", { clinicId: clinicId });
    }
    // filter by doctorId
    if (doctorId) {
        qb.andWhere("slot.doctorId = :doctorId", { doctorId: doctorId });
    }

    // check if slot is already booked
    qb.andWhere(`
      NOT EXISTS (
        SELECT 1 FROM APPOINTMENTS a
        WHERE a.APPOINTMENT_SLOT_ID = "slot"."ID"
          AND a.APPOINTMENT_STATUS IN (:...activeStatuses)
          AND a.IS_ACTIVE = 1
      )
    `, { activeStatuses });

    const [slots, total] = await qb.getManyAndCount();

    if (!slots.length) {
        return {
            data: [],
            pagination: buildPagination(page, limit, total),
        };
    }

    // Lấy unique clinicIds và doctorIds từ kết quả slots
    const clinicIdsUsed = Array.from(new Set(slots.map(slot => slot.clinicId)));
    const doctorIdsUsed = Array.from(new Set(slots.map(slot => slot.doctorId)));

    // Query dữ liệu liên quan qua CQRS
    const [clinics, doctors] = await Promise.all([
      this.queryBus.execute(new GetClinicsByIdsQuery(clinicIdsUsed)),
      this.queryBus.execute(new GetDoctorsByIdsQuery(doctorIdsUsed)),
    ]);    

    // Tạo map tra cứu nhanh
    const clinicMap = new Map(clinics.map((c: any) => [Number(c.id), c]));
    const doctorMap = new Map(doctors.map((d: any) => [Number(d.id), d]));

    // Map vào từng slot (dạng nested object: slot.clinic, slot.doctor)
    const result = slots.map(slot => ({
      ...slot,
      clinic: clinicMap.get(Number(slot.clinicId)) || null,
      doctor: doctorMap.get(Number(slot.doctorId)) || null,
    }));

    return {
      data: result,
      pagination: buildPagination(page, limit, total),
    };
  }
}