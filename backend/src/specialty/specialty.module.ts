import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { Specialty } from './entities/specialty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { BASE_SCHEMA } from '../constant/common.constant';
import { GetSpecialtiesHandler } from './queries/get-specialties.handler';
import { GetSpecialtyHandler } from './queries/get-specialty.handler';
import { CreateSpecialtyHandler } from './commands/create-specialty.handler';
import { GetSpecialtiesByIdsHandler } from './queries/get-specialties-by-ids.handler';

const QueryHandlers = [
  GetSpecialtiesHandler,
  GetSpecialtyHandler,
];

const CommandHandlers = [
  CreateSpecialtyHandler,
  GetSpecialtiesByIdsHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Specialty], BASE_SCHEMA.DEFAULT),
    CqrsModule,
  ],
  controllers: [SpecialtyController],
  providers: [SpecialtyService, ...QueryHandlers, ...CommandHandlers],
  exports: [CqrsModule],
})
export class SpecialtyModule {}
