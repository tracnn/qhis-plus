import { Module } from '@nestjs/common';
import { AcsModuleService } from './acs-module.service';
import { AcsModuleController } from './acs-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BASE_SCHEMA } from '../../constant/common.constant';
import { CqrsModule } from '@nestjs/cqrs';
import { ValidateCredentialsHandler } from './queries/validate-credentials.handler';

const queryHandlers = [
  ValidateCredentialsHandler
];


@Module({
  imports: [TypeOrmModule.forFeature([], BASE_SCHEMA.ACS_RS), CqrsModule],
  controllers: [AcsModuleController],
  providers: [AcsModuleService, ...queryHandlers],
  exports: [CqrsModule],
})
export class AcsModuleModule {}
