import { IQueryHandler, QueryBus } from "@nestjs/cqrs";
import { GetAppointmentQuery } from "./get-appointment.query";
import { QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Appointment } from "../entities/appointment.entity";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "../../constant/common.constant";
import { buildPagination } from "@common/pagination.util";
import { AppointmentSlot } from "../entities/appointment-slot.entity";
import { GetClinicsByIdsQuery } from "../../his-rs-module/queries/get-clinics-by-ids.query";
import { GetDoctorsByIdsQuery } from "../../his-rs-module/queries/get-doctors-by-ids.query";
import { GetPatientFromFamilyMemberByIdsQuery } from "../../family-members/queries/get-patient-from-family-member-by-ids.query";
import { GetPatientFromUserByIdsQuery } from "../../user/queries/get-patient-from-user-by-ids.query";

@QueryHandler(GetAppointmentQuery)
export class GetAppointmentHandler implements IQueryHandler<GetAppointmentQuery> {
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(AppointmentSlot)
        private readonly appointmentSlotRepository: Repository<AppointmentSlot>,
        private readonly queryBus: QueryBus,
    ) {}

    async execute(query: GetAppointmentQuery) {
        const { userId, getAppointmentDto } = query;

        const { page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = getAppointmentDto;
        const skip = (page - 1) * limit;

        const [appointments, total] = await this.appointmentRepository.findAndCount({
            where: { userId, isActive: true },  
            skip,
            take: limit,
            order: {
                appointmentCode: "ASC",
            },
        });

        if (!appointments.length) {
            return [];
        }

        // Bước 1: Lấy danh sách slotId
        const slotIds = appointments.map(a => a.appointmentSlotId);
        // Bước 2: Lấy thông tin slot
        const slots = await this.appointmentSlotRepository.find({ where: { id: In(slotIds) } });
        const slotMap = new Map(slots.map(s => [s.id, s]));

        // Bước 3: Lấy unique doctorId, clinicId, serviceCode từ slot
        const doctorIds = Array.from(new Set(slots.map(s => s.doctorId).filter(Boolean)));
        const clinicIds = Array.from(new Set(slots.map(s => s.clinicId).filter(Boolean)));

        // patient maybe family member or user
        const patientIds = appointments.map(a => a.patientId);

        // Promise.all get data from multiple queries
        const [clinics, doctors, patientsFromFamilyMembers, patientsFromUsers] = await Promise.all([
            this.queryBus.execute(new GetClinicsByIdsQuery(clinicIds)),
            this.queryBus.execute(new GetDoctorsByIdsQuery(doctorIds)), // tự định nghĩa nếu chưa có
            this.queryBus.execute(new GetPatientFromFamilyMemberByIdsQuery(patientIds)),
            this.queryBus.execute(new GetPatientFromUserByIdsQuery(patientIds)),
        ]);

        const clinicMap = new Map(clinics.map((c: any) => [Number(c.clinicId), c]));
        const doctorMap = new Map(doctors.map((d: any) => [Number(d.doctorId), d]));
        const patients = [...patientsFromFamilyMembers, ...patientsFromUsers].filter(Boolean);

        // Bước 5: Map lại kết quả
        const result = appointments.map(a => {
            const slot = slotMap.get(a.appointmentSlotId);
            return {
                ...a,
                slot,
                clinic: slot ? clinicMap.get(Number(slot.clinicId)) || null : null,
                doctor: slot ? doctorMap.get(Number(slot.doctorId)) || null : null,
                patient: patients.find(p => p.patientId === a.patientId) || null,
            };
        });

        return {
            data: result,
            pagination: buildPagination(page, limit, total),
        };
    }
}