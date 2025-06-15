import { IQuery } from "@nestjs/cqrs";
import { GetAppointmentSlotBySpecialtyDto } from "../dto/get-appointment-slot-by-specialty.dto";

export class GetAppointmentSlotBySpecialtyQuery implements IQuery {
    constructor(
        public readonly specialtyId: string,
        public readonly dto: GetAppointmentSlotBySpecialtyDto,
    ) {}
}