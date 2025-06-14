import { Module } from '@nestjs/common';
import { ClinicSpecialtyService } from './clinic-specialty.service';
import { ClinicSpecialtyController } from './clinic-specialty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicSpecialty } from './entities/clinic-specialty.entity';
import { BASE_SCHEMA } from '../constant/common.constant';
import { CreateClinicSpecialtyHandler } from './commands/create-clinic-specialty.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetClinicSpecialtyHandler } from './queries/get-clinic-specialty.handler';
import { GetClinicSpecialtyByIdHandler } from './queries/get-clinic-specialty-by-id.handler';

const commandHandlers = [
  CreateClinicSpecialtyHandler,
];

const queryHandlers = [
  GetClinicSpecialtyHandler,
  GetClinicSpecialtyByIdHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([ClinicSpecialty], BASE_SCHEMA.DEFAULT),
    CqrsModule,
  ],
  controllers: [ClinicSpecialtyController],
  providers: [ClinicSpecialtyService, ...commandHandlers, ...queryHandlers],
  exports: [CqrsModule],
})
export class ClinicSpecialtyModule {}
