import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { SLOT_TIME } from './enums/slot-time.enum';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAppointmentSlotCommand } from './commands/create-appointment-slot.command';
import { CreateAppointmentSlotDto } from './dto/create-appointment-slot.dto';
import { GetAppointmentSlotDto } from './dto/get-appointment-slot.dto';
import { GetAppointmentSlotQuery } from './queries/get-appointment-slot.query';
import { GetAppointmentSlotByIdQuery } from './queries/get-appointment-slot-by-id.query';
import { SLOT_TYPE } from './enums/slot-type.enum';
import { GetAppointmentSlotBySpecialtyQuery } from './queries/get-appointment-slot-by-specialty.query';
import { GetAppointmentSlotBySpecialtyDto } from './dto/get-appointment-slot-by-specialty.dto';
import { CreateAppointmentCommand } from './commands/create-appointment.command';
import { GetAppointmentDto } from './dto/get-appointment.dto';
import { GetAppointmentQuery } from './queries/get-appointment.query';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createSlot(createAppointmentSlotDto: CreateAppointmentSlotDto) {
    return await this.commandBus.execute(new CreateAppointmentSlotCommand(createAppointmentSlotDto));
  }

  async findAllSlot(getAppointmentSlotDto: GetAppointmentSlotDto) {
    return await this.queryBus.execute(new GetAppointmentSlotQuery(getAppointmentSlotDto));
  }

  async findOneSlot(id: string) {
    return await this.queryBus.execute(new GetAppointmentSlotByIdQuery(id));
  }

  async findSlotBySpecialty(dto: GetAppointmentSlotBySpecialtyDto) {
    return await this.queryBus.execute(new GetAppointmentSlotBySpecialtyQuery(dto));
  }

  async createAppointment(userId: string, appointment: CreateAppointmentDto) {
    return await this.commandBus.execute(new CreateAppointmentCommand(userId, appointment));
  }

  async findAllAppointment(userId: string, dto: GetAppointmentDto) {
    return await this.queryBus.execute(new GetAppointmentQuery(userId, dto));
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }

  getSlotTime() {
    return Object.entries(SLOT_TIME).map(([key, value]) => ({
      key,
      label: value,
    }));
  }

  getSlotType() {
    return Object.entries(SLOT_TYPE).map(([key, value]) => ({
      key,
      label: value,
    }));
  }
}
