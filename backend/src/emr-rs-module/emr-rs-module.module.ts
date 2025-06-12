import { Module } from '@nestjs/common';
import { EmrRsModuleService } from './emr-rs-module.service';
import { EmrRsModuleController } from './emr-rs-module.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetDocumentListByTreatmentIdHandler } from './queries/get-document-list-by-treatment-id.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BASE_SCHEMA } from '../constant/common.constant';
import { GetDocumentByIdHandler } from './queries/get-document-by-id.handler';
import { FtpModule } from '../ftp/ftp.module';
import { MinioModule } from '../minio/minio.module';
import { GetRelationListHandler } from './queries/get-relation-list.handler';
import { OrganizationConfigService } from '../common/organization-config.service';

const handlers = [
  GetDocumentListByTreatmentIdHandler,
  GetDocumentByIdHandler,
  GetRelationListHandler,
  OrganizationConfigService
]

@Module({
  imports: [
    CqrsModule, 
    TypeOrmModule.forFeature([], BASE_SCHEMA.EMR_RS),
    FtpModule,
    MinioModule
  ],
  controllers: [EmrRsModuleController],
  providers: [EmrRsModuleService, ...handlers],
  exports: [CqrsModule]
})
export class EmrRsModuleModule {}
