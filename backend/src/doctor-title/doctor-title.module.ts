import { Module } from '@nestjs/common';
import { DoctorTitleService } from './doctor-title.service';
import { DoctorTitleController } from './doctor-title.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorTitle } from './entities/doctor-title.entity';
import { BASE_SCHEMA } from '../constant/common.constant';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateDoctorTitleHandler } from './commands/create-doctor-title.handler';
import { GetDoctorTitleHandler } from './queries/get-doctor-title.handler';
import { GetDoctorTitleByIdHandler } from './queries/get-doctor-title-by-id.handler';
import { GetDoctorTitleByTitleQueryHandler } from './queries/get-doctor-title-by-title.handler';
import { GetDoctorTitleByDoctorIdsHandler } from './queries/get-doctor-title-by-doctor-ids-handler';

const CommandHandlers = [
  CreateDoctorTitleHandler,
];

const QueryHandlers = [
  GetDoctorTitleHandler,
  GetDoctorTitleByIdHandler,
  GetDoctorTitleByTitleQueryHandler,
  GetDoctorTitleByDoctorIdsHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorTitle], BASE_SCHEMA.DEFAULT),
    CqrsModule,
  ],
  controllers: [DoctorTitleController],
  providers: [DoctorTitleService, ...CommandHandlers, ...QueryHandlers],
  exports: [CqrsModule],
})
export class DoctorTitleModule {}
