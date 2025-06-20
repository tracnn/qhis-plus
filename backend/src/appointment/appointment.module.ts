import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BASE_SCHEMA } from '../constant/common.constant';
import { CqrsModule } from '@nestjs/cqrs';
import { Appointment } from './entities/appointment.entity';
import { AppointmentSlot } from './entities/appointment-slot.entity';
import { CreateAppointmentSlotCommandHandler } from './commands/create-appointment-slot.handler';
import { GetAppointmentSlotQueryHandler } from './queries/get-appointment-slot.handler';
import { GetAppointmentSlotByIdQueryHandler } from './queries/get-appointment-slot-by-id.handler';
import { GetAppointmentSlotBySpecialtyQueryHandler } from './queries/get-appointment-slot-by-specialty.handler';
import { CreateAppointmentHandler } from './commands/create-appointment.handler';
import { GetAppointmentHandler } from './queries/get-appointment.handler';
import { GetDoctorIdsFromAppointmentSlotQueryHandler } from './queries/get-doctor-ids-from-appointment-slot.handler';

const CommandHandlers = [
  CreateAppointmentSlotCommandHandler,
  CreateAppointmentHandler,
];

const QueryHandlers = [
  GetAppointmentSlotQueryHandler,
  GetAppointmentSlotByIdQueryHandler,
  GetAppointmentSlotBySpecialtyQueryHandler,
  GetAppointmentHandler,
  GetDoctorIdsFromAppointmentSlotQueryHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      AppointmentSlot,
    ], BASE_SCHEMA.DEFAULT),
    CqrsModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, ...CommandHandlers, ...QueryHandlers],
  exports: [CqrsModule],
})
export class AppointmentModule {}
