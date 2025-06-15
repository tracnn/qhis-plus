import { ICommand } from "@nestjs/cqrs";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";

export class CreateAppointmentCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly appointment: CreateAppointmentDto,
    ) {}
}