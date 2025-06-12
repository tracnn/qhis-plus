import { Module } from '@nestjs/common';
import { AcsModuleService } from './acs-module.service';
import { AcsModuleController } from './acs-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BASE_SCHEMA } from '../../constant/common.constant';
import { CqrsModule } from '@nestjs/cqrs';
import { ValidateCredentialsHandler } from './queries/validate-credentials.handler';
import { GetUserByIdHandler } from './queries/get-user-by-id.handler';

const queryHandlers = [
  ValidateCredentialsHandler,
  GetUserByIdHandler
];


@Module({
  imports: [TypeOrmModule.forFeature([], BASE_SCHEMA.ACS_RS), CqrsModule],
  controllers: [AcsModuleController],
  providers: [AcsModuleService, ...queryHandlers],
  exports: [CqrsModule],
})
export class AcsModuleModule {}
