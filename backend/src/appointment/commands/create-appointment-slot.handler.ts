import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateAppointmentSlotCommand } from "./create-appointment-slot.command";
import { AppointmentSlot } from "../entities/appointment-slot.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BadRequestException } from "@nestjs/common";
import { ERROR_400 } from "@common/error-messages/error-400";

@CommandHandler(CreateAppointmentSlotCommand)
export class CreateAppointmentSlotCommandHandler implements ICommandHandler<CreateAppointmentSlotCommand> {
  constructor(
    @InjectRepository(AppointmentSlot)
    private readonly appointmentSlotRepository: Repository<AppointmentSlot>,
  ) {}

  async execute(command: CreateAppointmentSlotCommand): Promise<any> {
    const { createAppointmentSlotDto } = command;

    const checkSlot = await this.appointmentSlotRepository.find({
      where: {
        slotDate: createAppointmentSlotDto.slotDate,
        slotTime: createAppointmentSlotDto.slotTime,
        clinicId: createAppointmentSlotDto.clinicId,
      },
    });

    if (checkSlot.length > 0) {
      throw new BadRequestException(ERROR_400.SLOT_EXISTS);
    }

    const appointmentSlot = this.appointmentSlotRepository.create(createAppointmentSlotDto);
    return await this.appointmentSlotRepository.save(appointmentSlot);
  }
}