import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetDoctorIdsFromAppointmentSlotQuery } from "./get-doctor-ids-from-appointment-slot.query";
import { GetAppointmentSlotBySpecialtyQuery } from "./get-appointment-slot-by-specialty.query";
import { GetAppointmentSlotBySpecialtyDto } from "../dto/get-appointment-slot-by-specialty.dto";

@QueryHandler(GetDoctorIdsFromAppointmentSlotQuery)
export class GetDoctorIdsFromAppointmentSlotQueryHandler implements IQueryHandler<GetDoctorIdsFromAppointmentSlotQuery> {
    constructor(
        private readonly queryBus: QueryBus,
    ) {}

    async execute(query: GetDoctorIdsFromAppointmentSlotQuery): Promise<any> {
        const slots = await this.queryBus.execute(
            new GetAppointmentSlotBySpecialtyQuery(query as GetAppointmentSlotBySpecialtyDto));
        if (!slots.length) return [];
        return [...new Set(slots.map((slot: any) => slot.doctorId))];
    }
}