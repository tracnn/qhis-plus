import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetDocumentListByTreatmentIdDto } from './dto/get-document-list-by-treatment-id.dto';
import { GetDocumentListByTreatmentIdQuery } from './queries/get-document-list-by-treatment-id.query';
import { GetDocumentByIdDto } from './dto/get-document-by-id.dto';
import { GetDocumentByIdQuery } from './queries/get-document-by-id.query';
import { ERROR_404 } from '../common/error-messages/error-404';
import { EMR_DOCUMENT_CONTENT_TYPE } from '../constant/common.constant';
import { FtpService } from '../ftp/ftp.service';
import { ftpEmrOption } from '../constant/ftp-client.constant';
import { MinioService } from '../minio/minio.service';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { GetRelationListDto } from './dto/get-relation-list.dto';
import { GetRelationListQuery } from './queries/get-relation-list.query';

@Injectable()
export class EmrRsModuleService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly ftpService: FtpService,
    private readonly minioService: MinioService,
  ) {}

  async getRelationList(query: GetRelationListDto) {
    return await this.queryBus.execute(new GetRelationListQuery(query));
  }

  async getDocumentListByTreatmentId(query: GetDocumentListByTreatmentIdDto) {
    return await this.queryBus.execute(new GetDocumentListByTreatmentIdQuery(query));
  }

  async getDocumentById(query: GetDocumentByIdDto) {
    const document = await this.queryBus.execute(new GetDocumentByIdQuery(query));

    if(!document || document.length === 0) {
      throw new NotFoundException([ERROR_404.NOT_FOUND_DOCUMENT]);
    }

    const doc = document[0];
    
    let filePath = doc.lastVersionUrl.replace(/^\\+/, '');
    filePath = filePath.replace(/\\/g, '/');
    const originalFileName = path.basename(filePath);
    const patientCode = doc.patientCode;
    const treatmentCode = doc.treatmentCode;
    //const fileName = `${patientCode}/${treatmentCode}/${originalFileName}`;
    const minioFileName = `${patientCode}/${treatmentCode}/${originalFileName}`;
    const fileType = doc.documentFileType.toLowerCase() as keyof typeof EMR_DOCUMENT_CONTENT_TYPE;
    const contentType = EMR_DOCUMENT_CONTENT_TYPE[fileType]

    const metaData = {
      'document-id': encodeURIComponent(doc.id),
      'create-time': encodeURIComponent(doc.createTime),
      'creator': encodeURIComponent(doc.creator),
      'document-name': encodeURIComponent(doc.documentName),
      'document-type-id': encodeURIComponent(doc.documentTypeId),
      'document-type-name': encodeURIComponent(doc.documentTypeName),
      'patient-code': encodeURIComponent(doc.patientCode),
      'treatment-code': encodeURIComponent(doc.treatmentCode),
      'his-code': encodeURIComponent(doc.hisCode)
    }

    const exists = await this.minioService.exists(minioFileName);
    let buffer: Buffer;
    if (exists) {
      buffer = await this.minioService.getFile(minioFileName);
    } else {
      buffer = await this.ftpService.downloadToBuffer(ftpEmrOption, filePath);
      await this.minioService.uploadContent(buffer, minioFileName, contentType, metaData);
    }

    const base64Data = buffer.toString('base64');

    return {
      contentType: contentType,
      metaData: metaData,
      base64: base64Data
    };
  }
}
