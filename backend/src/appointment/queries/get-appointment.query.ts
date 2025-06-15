import { IQuery } from "@nestjs/cqrs";
import { GetAppointmentDto } from "../dto/get-appointment.dto";

export class GetAppointmentQuery implements IQuery {
    constructor(
        public readonly userId: string,
        public readonly getAppointmentDto: GetAppointmentDto,
    ) {}
}