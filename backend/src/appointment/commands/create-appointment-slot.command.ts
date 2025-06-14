import { CreateAppointmentSlotDto } from "../dto/create-appointment-slot.dto";

export class CreateAppointmentSlotCommand {
  constructor(public readonly createAppointmentSlotDto: CreateAppointmentSlotDto) {}
}