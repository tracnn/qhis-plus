import { InjectDataSource } from '@nestjs/typeorm';
import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { GetServiceReqByTreatmentIdQuery } from './get-service-req-by-treatment-id.query';
import { NotFoundException } from '@nestjs/common';
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT, 
  SERVICE_REQ_TYPE_IDS_CLINICAL_LAB, SERVICE_REQ_STATUS_ID, SERVICE_REQ_STATUS_HAS_START_TIME, 
  SERVICE_REQ_STATUS_HAS_END_TIME } from '../../constant/common.constant';
import { groupByParentHelper } from '../../common/group-by-parent.helper';
import { GetDocumentListByTreatmentIdQuery } from '../../emr-rs-module/queries/get-document-list-by-treatment-id.query';
import { ERROR_404 } from '../../common/error-messages/error-404';
import { OrganizationConfigService } from '../../common/organization-config.service';
import { CheckTreatmentFinishedByTreatmentIdQuery } from './check-treatment-finished-by-treatment-id.query';
import { GetPacsLinkByTreatmentIdQuery } from './get-pacs-link-by-treatment-id.query';
import { buildPagination } from '../../common/pagination.util';

@QueryHandler(GetServiceReqByTreatmentIdQuery)
export class GetServiceReqByTreatmentIdHandler implements IQueryHandler<GetServiceReqByTreatmentIdQuery> {
  constructor(
    @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
    private readonly queryBus: QueryBus,
    private readonly organizationConfigService: OrganizationConfigService
  ) {}

  async execute(query: GetServiceReqByTreatmentIdQuery): Promise<any> {
    const { dto } = query;
    const { treatmentId, page = PAGE_DEFAULT, limit = LIMIT_DEFAULT, serviceReqStatusId } = dto;

    const offset = (page - 1) * limit;

    const serviceReqTypeIdsString = SERVICE_REQ_TYPE_IDS_CLINICAL_LAB.join(',');

    const statusCondition = serviceReqStatusId && serviceReqStatusId > SERVICE_REQ_STATUS_ID.ALL
      ? `AND HSR.SERVICE_REQ_STT_ID = ${serviceReqStatusId}`
      : '';

    const statusHasStartTimeString = SERVICE_REQ_STATUS_HAS_START_TIME.join(',');
    const statusHasEndTimeString = SERVICE_REQ_STATUS_HAS_END_TIME.join(',');
    
    const countQuery = `
      SELECT 
        COUNT(*) AS "total"
      FROM 
        HIS_SERVICE_REQ HSR
      JOIN 
        HIS_SERE_SERV HSS ON HSS.SERVICE_REQ_ID = HSR.ID
      WHERE 
        HSR.TREATMENT_ID = :P1
        AND HSR.IS_ACTIVE = 1
        AND HSR.IS_DELETE = 0
        AND HSS.IS_DELETE = 0
        AND HSS.IS_NO_EXECUTE IS NULL
        ${statusCondition}
        AND HSR.SERVICE_REQ_TYPE_ID NOT IN (${serviceReqTypeIdsString})
    `;
        
    const dataQuery = `
      SELECT
          HSR.ID AS "id",
          HSRT.SERVICE_REQ_TYPE_CODE AS "serviceReqTypeCode",
          HSRT.SERVICE_REQ_TYPE_NAME AS "serviceReqTypeName",
          HDT.DIIM_TYPE_NAME || HFT.FUEX_TYPE_NAME || HT.TEST_TYPE_NAME AS "subServiceDetail",
          HSST.SERVICE_REQ_STT_NAME AS "serviceReqSttName",
          HSST.SERVICE_REQ_STT_CODE AS "serviceReqSttCode",
          HER.EXECUTE_ROOM_NAME AS "executeRoomName",
          HR.ADDRESS AS "address",
          HSR.NUM_ORDER AS "numOrder",
          HSR.EXECUTE_ROOM_ID AS "executeRoomId",
          TO_CHAR(TO_DATE(HSR.INTRUCTION_TIME, 'YYYYMMDDHH24MISS'), 'DD/MM/YYYY HH24:MI') AS "intructionTime",
          HSR.BARCODE AS "barcode",
          HSR.ASSIGN_TURN_CODE AS "assignTurnCode",
          HSS.TDL_SERVICE_NAME AS "serviceName",
          HSS.AMOUNT AS "amount",
          HSS.PRICE AS "price",
          HSR.SERVICE_REQ_CODE AS "serviceReqCode",
          HSS.ID AS "sereServId",
          CASE 
            WHEN 
              HSR.SERVICE_REQ_STT_ID IN (${statusHasStartTimeString}) 
            THEN 
              TO_CHAR(TO_DATE(HSR.START_TIME, 'YYYYMMDDHH24MISS'), 'DD/MM/YYYY HH24:MI')
            ELSE NULL
          END AS "startedTime",
          CASE 
            WHEN 
              HSR.SERVICE_REQ_STT_ID IN (${statusHasEndTimeString}) 
            THEN 
              TO_CHAR(TO_DATE(HSR.FINISH_TIME, 'YYYYMMDDHH24MISS'), 'DD/MM/YYYY HH24:MI')
            ELSE NULL
          END AS "finishedTime",
          HSR.EXECUTE_USERNAME AS "executeUserName",
          HSR.REQUEST_USERNAME AS "requestUserName",
          HSR.SAMPLE_ROOM_ID AS "sampleRoomId",
          HSPR.SAMPLE_ROOM_CODE AS "sampleRoomCode",
          HSPR.SAMPLE_ROOM_NAME AS "sampleRoomName",
          HSR.REQUEST_ROOM_ID AS "requestRoomId",
          COALESCE(HRR.EXECUTE_ROOM_NAME, HBR.BED_ROOM_NAME, HRCR.RECEPTION_ROOM_NAME) AS "requestRoomName",
          COALESCE(HRR.EXECUTE_ROOM_CODE, HBR.BED_ROOM_CODE, HRCR.RECEPTION_ROOM_CODE) AS "requestRoomCode",
          COALESCE(HSPR.SAMPLE_ROOM_NAME, HER.EXECUTE_ROOM_NAME) AS "workingRoomName",
          COALESCE(HSPR.SAMPLE_ROOM_NAME, HR.ADDRESS) AS "workingRoomAddress",
          HS.ESTIMATE_DURATION AS "estimateDuration"
      FROM 
          HIS_SERVICE_REQ HSR
      JOIN 
          HIS_SERE_SERV HSS ON HSS.SERVICE_REQ_ID = HSR.ID
      JOIN 
          HIS_EXECUTE_ROOM HER ON HER.ROOM_ID = HSR.EXECUTE_ROOM_ID
      LEFT JOIN
          HIS_EXECUTE_ROOM HRR ON HRR.ROOM_ID = HSR.REQUEST_ROOM_ID
      LEFT JOIN
          HIS_BED_ROOM HBR ON HBR.ROOM_ID = HSR.REQUEST_ROOM_ID
      LEFT JOIN
          HIS_RECEPTION_ROOM HRCR ON HRCR.ROOM_ID = HSR.REQUEST_ROOM_ID
      JOIN 
          HIS_ROOM HR ON HR.ID = HER.ROOM_ID
      JOIN 
          HIS_SERVICE_REQ_TYPE HSRT ON HSRT.ID = HSR.SERVICE_REQ_TYPE_ID
      JOIN 
          HIS_SERVICE_REQ_STT HSST ON HSST.ID = HSR.SERVICE_REQ_STT_ID
      JOIN
          HIS_SERVICE HS ON HS.ID = HSS.SERVICE_ID
      JOIN
          HIS_SERVICE_TYPE HST ON HST.ID = HSS.TDL_SERVICE_TYPE_ID
      LEFT JOIN
          HIS_DIIM_TYPE HDT ON HDT.ID = HS.DIIM_TYPE_ID
      LEFT JOIN
          HIS_FUEX_TYPE HFT ON HFT.ID = HS.FUEX_TYPE_ID
      LEFT JOIN
          HIS_TEST_TYPE HT ON HT.ID = HS.TEST_TYPE_ID
       LEFT JOIN
          HIS_SAMPLE_ROOM HSPR ON HSPR.ID = HSR.SAMPLE_ROOM_ID
      WHERE 
          HSR.TREATMENT_ID = :P1
          AND HSR.IS_ACTIVE = 1
          AND HSR.IS_DELETE = 0
          AND HSS.IS_DELETE = 0
          AND HSS.IS_NO_EXECUTE IS NULL
          ${statusCondition}
          AND HSR.SERVICE_REQ_TYPE_ID NOT IN (${serviceReqTypeIdsString})
      ORDER 
          BY HST.NUM_ORDER DESC
      OFFSET :P2 ROWS FETCH NEXT :P3 ROWS ONLY
    `;

    const [data, countResult] = await Promise.all([
      this.dataSource.query(dataQuery, [treatmentId, offset, limit]),
      this.dataSource.query(countQuery, [treatmentId])
    ]);

    const total = Number(countResult?.[0]?.total || 0);

    if (!data || data.length === 0) {
      throw new NotFoundException(ERROR_404.NOT_FOUND_SERVICE_REQ);
    }

    const documentlist = await this.queryBus.execute(new GetDocumentListByTreatmentIdQuery({ treatmentId }));

    // Chuẩn hóa documentlist
    const docMap = new Map<string, string[]>();
    for (const doc of documentlist) {
      if (!docMap.has(doc.hisCode)) {
        docMap.set(doc.hisCode, []);
      }
      docMap.get(doc.hisCode)?.push(doc.id);
    }

    for (const item of data) {
      const documentIds = documentlist
        .filter((doc: any) => {
          if (!doc.hisCode) return false;
          const hasServiceReqCode = doc.hisCode.includes(`SERVICE_REQ_CODE:${item.serviceReqCode}`);
          const hasSereServId = doc.hisCode.includes(`SER_SERV_ID:${item.sereServId}`);
          return hasServiceReqCode && (hasSereServId || !doc.hisCode.includes('SER_SERV_ID:'));
    })
        .map((doc: any) => doc.id);
    
      item.documentIds = documentIds;
    }

    // Lấy link pacs
    const pacsLinks = await this.queryBus.execute(new GetPacsLinkByTreatmentIdQuery({ treatmentId }));
    const pacsMap = new Map<number, string>();
    for (const pacs of pacsLinks) {
      pacsMap.set(pacs.id, pacs.link);
    }

    const result = groupByParentHelper(
      data,
      'id',
      'services',
      ['id', 'numOrder','requestUsername', 'serviceReqCode', 'intructionTime', 'requestUserName', 'barcode', 'assignTurnCode',
        'serviceReqTypeCode', 'serviceReqTypeName', 'serviceReqSttCode', 'serviceReqSttName', 'address', 'executeRoomName', 'executeRoomId',
        'startedTime', 'finishedTime', 'sampleRoomName', 'sampleRoomCode', 'sampleRoomId', 'requestRoomName', 
        'requestRoomCode', 'requestRoomId', 'workingRoomName', 'workingRoomAddress', 'estimateDuration'],
      ['sereServId', 'serviceName', 'amount', 'price',  
       'executeUserName', 'documentIds']
    );

    let showResultWhenTreatmentFinished = this.organizationConfigService.showResultWhenTreatmentFinished;
    let checkTreatmentFinished = true;
    if(showResultWhenTreatmentFinished) {
      checkTreatmentFinished = await this.queryBus.execute(new CheckTreatmentFinishedByTreatmentIdQuery(treatmentId));
    }

    for (const parent of result) {
      const allDocIds = (parent.services || []).flatMap((child: any) => child.documentIds || []);
      parent.documentIds = Array.from(new Set(allDocIds));
      if(showResultWhenTreatmentFinished && !checkTreatmentFinished) {
        parent.documentIds = [];
      }
      if (parent.services) {
        for (const child of parent.services) {
          // Gắn PACS link nếu có
          const pacsLink = pacsMap.get(child.sereServId);
          child.pacsLink = pacsLink || null;

          delete child.documentIds;
        }
      }
    }

    return {
      data: result,
      pagination: buildPagination(page, limit, total)
    };
  }
}