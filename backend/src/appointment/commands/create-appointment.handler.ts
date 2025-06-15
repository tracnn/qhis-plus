import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateAppointmentCommand } from "./create-appointment.command";
import { Appointment } from "../entities/appointment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Like, Repository } from "typeorm";
import { BadRequestException } from "@nestjs/common";
import { AppointmentSlot } from "../entities/appointment-slot.entity";
import { ERROR_400 } from "@common/error-messages/error-400";
import { APPOINTMENT_STATUS } from "../enums/appointment-status.enum";

@CommandHandler(CreateAppointmentCommand)
export class CreateAppointmentHandler implements ICommandHandler<CreateAppointmentCommand> {
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(AppointmentSlot)
        private readonly appointmentSlotRepository: Repository<AppointmentSlot>,
    ) {}

    async execute(command: CreateAppointmentCommand) {
        const { userId, appointment } = command;

        const slot = await this.appointmentSlotRepository.findOne({
            where: { id: appointment.appointmentSlotId }
        });
        if (!slot) throw new BadRequestException(ERROR_400.APPOINTMENT_SLOT_NOT_FOUND);

        const isSlotAlreadyBooked = await this.isSlotAlreadyBooked(this.appointmentRepository, appointment.appointmentSlotId);
        if (isSlotAlreadyBooked) throw new BadRequestException(ERROR_400.SLOT_ALREADY_BOOKED);

        const appointmentCode = await this.generateAppointmentCode(slot.slotDate);

        const newAppointment = this.appointmentRepository.create({
            ...appointment,
            userId,
            createdBy: userId,
            appointmentCode,
        });

        return await this.appointmentRepository.save(newAppointment);
    }

    // generate appointment code
    async generateAppointmentCode(slotDate: string) {
        const dateStr = slotDate.replace(/-/g, "");
        const countToday = await this.appointmentRepository.count({
          where: { appointmentCode: Like(`A${dateStr}-%`) }
        });
        const serial = String(countToday + 1).padStart(6, '0');
        return `A${dateStr}-${serial}`;
    }

    // check if slot is already booked
    async isSlotAlreadyBooked(
        repo: Repository<Appointment>,
        appointmentSlotId: string
    ): Promise<boolean> {
        const activeStatuses = [
            APPOINTMENT_STATUS.PENDING,
            APPOINTMENT_STATUS.CONFIRMED,
            APPOINTMENT_STATUS.CHECKED_IN,
            APPOINTMENT_STATUS.COMPLETED,
        ];
      
        const exist = await repo.findOne({
            where: {
                appointmentSlotId,
                appointmentStatus: In(activeStatuses),
                isActive: true,
            }
        });
        return !!exist;
    }
}