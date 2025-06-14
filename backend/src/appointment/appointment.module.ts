import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BASE_SCHEMA } from '../constant/common.constant';
import { CqrsModule } from '@nestjs/cqrs';
import { Appointment } from './entities/appointment.entity';
import { DoctorTitle } from './entities/doctor-title.entity';
import { AppointmentSlot } from './entities/appointment-slot.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorTitle,
      Appointment,
      AppointmentSlot,
    ], BASE_SCHEMA.DEFAULT),
    CqrsModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [CqrsModule],
})
export class AppointmentModule {}
