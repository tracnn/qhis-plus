import { IQuery } from "@nestjs/cqrs";
import { GetAppointmentSlotDto } from "../dto/get-appointment-slot.dto";

export class GetAppointmentSlotQuery implements IQuery {
  constructor(public readonly getAppointmentSlotDto: GetAppointmentSlotDto) {}
}