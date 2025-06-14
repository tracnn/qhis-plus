import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAppointmentSlotByIdQuery } from "./get-appointment-slot-by-id.query";
import { Repository } from "typeorm";
import { AppointmentSlot } from "../entities/appointment-slot.entity";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(GetAppointmentSlotByIdQuery)
export class GetAppointmentSlotByIdQueryHandler implements IQueryHandler<GetAppointmentSlotByIdQuery> {
  constructor(
    @InjectRepository(AppointmentSlot)
    private readonly appointmentSlotRepository: Repository<AppointmentSlot>,
  ) {}

  async execute(query: GetAppointmentSlotByIdQuery): Promise<any> {
    const { id } = query;
    return await this.appointmentSlotRepository.findOne({ where: { id } });
  }
}