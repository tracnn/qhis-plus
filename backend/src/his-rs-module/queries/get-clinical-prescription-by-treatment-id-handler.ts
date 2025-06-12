import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetClinicalPrescriptionByTreatmentIdDto } from "../dto/get-clinical-prescription-by-treatment-id.dto";
import { GetClinicalPrescriptionByTreatmentIdQuery } from "./get-clinical-prescription-by-treatment-id.query";
import { DataSource } from "typeorm";
import { BASE_SCHEMA, LIMIT_DEFAULT, PAGE_DEFAULT, PRESCRIPTION_SOURCE_TYPE, 
    SERVICE_REQ_TYPE_IDS_CLINICAL_PRESCRIPTION } from "../../constant/common.constant";
import { InjectDataSource } from "@nestjs/typeorm";
import { groupByParentHelper } from "../../common/group-by-parent.helper";
import { GetDocumentListByTreatmentIdQuery } from "../../emr-rs-module/queries/get-document-list-by-treatment-id.query";
import { OrganizationConfigService } from "../../common/organization-config.service";
import { CheckTreatmentFinishedByTreatmentIdQuery } from "./check-treatment-finished-by-treatment-id.query";
import { buildPagination } from "@common/pagination.util";
@QueryHandler(GetClinicalPrescriptionByTreatmentIdQuery)
export class GetClinicalPrescriptionByTreatmentIdHandler implements IQueryHandler<GetClinicalPrescriptionByTreatmentIdQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
        private readonly queryBus: QueryBus,
        private readonly organizationConfigService: OrganizationConfigService
    ) {}

    async execute(query: GetClinicalPrescriptionByTreatmentIdQuery): Promise<any> {
        const { treatmentId, page = PAGE_DEFAULT, limit = LIMIT_DEFAULT } = query.dto;
        
        const offset = (page - 1) * limit;

    const serviceReqTypeIdsString = SERVICE_REQ_TYPE_IDS_CLINICAL_PRESCRIPTION.join(',');

        const countQuery = `
            SELECT 
                COUNT(*) AS TOTAL
            FROM 
                HIS_SERVICE_REQ HSR
            LEFT JOIN
                HIS_SERE_SERV HSS ON HSS.SERVICE_REQ_ID = HSR.ID
            LEFT JOIN
                HIS_SERVICE_REQ_METY HSRM ON HSRM.SERVICE_REQ_ID = HSR.ID
            WHERE
                HSR.TREATMENT_ID = :P1
                AND HSR.IS_DELETE = 0
                AND HSR.SERVICE_REQ_TYPE_ID IN (${serviceReqTypeIdsString})
        `;

        const internalSource = PRESCRIPTION_SOURCE_TYPE.INTERNAL;
        const externalSource = PRESCRIPTION_SOURCE_TYPE.EXTERNAL;

        const dataQuery = `
            SELECT * FROM 
            (SELECT
                HSR.ID AS "id",
                HSR.SERVICE_REQ_CODE AS "serviceReqCode",
                HSR.REQUEST_USERNAME AS "requestUsername",
                TO_CHAR(TO_DATE(HSR.INTRUCTION_TIME, 'YYYYMMDDHH24MISS'), 'DD/MM/YYYY HH24:MI') AS "intructionTime",
                HSS.TDL_SERVICE_NAME AS "medicineTypeName",
                HSU.SERVICE_UNIT_NAME AS "unitName",
                HSS.TDL_MEDICINE_CONCENTRA AS "medicineConcentra",
                HMT.ACTIVE_INGR_BHYT_NAME AS "activeIngredientName",
                HMT.PACKING_TYPE_NAME AS "packingTypeName",
                HEMM.NUM_ORDER AS "numOrder",
                HSS.AMOUNT AS "amount",
                HEMM.TUTORIAL AS "tutorial",
                HEMM.MORNING AS "morning",
                HEMM.NOON AS "noon",
                HEMM.AFTERNOON AS "afternoon",
                HEMM.EVENING AS "evening",
                '${internalSource}' AS "sourceType"
            FROM 
                HIS_SERVICE_REQ HSR
            JOIN 
                HIS_SERE_SERV HSS ON HSS.SERVICE_REQ_ID = HSR.ID
            LEFT JOIN
                HIS_EXP_MEST_MEDICINE HEMM ON HEMM.ID = HSS.EXP_MEST_MEDICINE_ID
            JOIN
                HIS_SERVICE_UNIT HSU ON HSU.ID = HSS.TDL_SERVICE_UNIT_ID
            LEFT JOIN
                HIS_MEDICINE HM ON HM.ID = HSS.MEDICINE_ID
            LEFT JOIN
                HIS_MEDICINE_TYPE HMT ON HMT.ID = HM.MEDICINE_TYPE_ID
            WHERE 
                HSR.TREATMENT_ID = :P1
                AND HSR.IS_DELETE = 0
                AND HSR.SERVICE_REQ_TYPE_ID IN (${serviceReqTypeIdsString})
                AND HSS.IS_DELETE = 0
            UNION ALL
            
            SELECT
                HSR.ID AS "id",
                HSR.SERVICE_REQ_CODE AS "serviceReqCode",
                HSR.REQUEST_USERNAME AS "requestUsername",
                TO_CHAR(TO_DATE(HSR.INTRUCTION_TIME, 'YYYYMMDDHH24MISS'), 'DD/MM/YYYY HH24:MI') AS "intructionTime",
                HSRM.MEDICINE_TYPE_NAME AS "medicineTypeName",
                HSRM.UNIT_NAME AS "unitName",
                HMT.CONCENTRA AS "medicineConcentra",
                HMT.ACTIVE_INGR_BHYT_NAME AS "activeIngredientName",
                HMT.PACKING_TYPE_NAME AS "packingTypeName",
                HSRM.NUM_ORDER AS "numOrder",
                HSRM.AMOUNT AS "amount",
                HSRM.TUTORIAL AS "tutorial",
                HSRM.MORNING AS "morning",
                HSRM.NOON AS "noon",
                HSRM.AFTERNOON AS "afternoon",
                HSRM.EVENING AS "evening",
                '${externalSource}' AS "sourceType"
            FROM 
                HIS_SERVICE_REQ HSR
            JOIN 
                HIS_SERVICE_REQ_METY HSRM ON HSRM.SERVICE_REQ_ID = HSR.ID
            LEFT JOIN
                HIS_MEDICINE_TYPE HMT ON HMT.ID = HSRM.MEDICINE_TYPE_ID
            WHERE 
                HSR.TREATMENT_ID = :P2
                AND HSR.IS_DELETE = 0
                AND HSR.SERVICE_REQ_TYPE_ID IN (${serviceReqTypeIdsString})
                AND HSRM.IS_DELETE = 0
            )
            ORDER BY "serviceReqCode", "numOrder"
            OFFSET :P3 ROWS FETCH NEXT :P4 ROWS ONLY
        `;

        const [data, countResult] = await Promise.all([
            this.dataSource.query(dataQuery, [treatmentId, treatmentId, offset, limit]),
            this.dataSource.query(countQuery, [treatmentId])
        ]);

        const total = Number(countResult?.[0]?.TOTAL || 0);

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
                    return hasServiceReqCode;
                })
                .map((doc: any) => doc.id);
            
            item.documentIds = documentIds;
        }
        
        const result = groupByParentHelper(
            data,
            'id',                      // Trường để nhóm cha
            'medicines',               // Tên mảng con
            ['id', 'requestUsername', 'intructionTime', 'sourceType', 'serviceReqCode'],                    // Các field của cha (bạn có thể thêm nhiều field: ['id', 'patientName', ...])
            ['medicineTypeName', 'activeIngredientName', 'unitName', 'medicineConcentra', 'packingTypeName', 'numOrder',
                'amount', 'tutorial', 'morning', 'noon', 'afternoon', 'evening', 'documentIds'] // Các field của con
        );
          
          let showResultWhenTreatmentFinished = this.organizationConfigService.showResultWhenTreatmentFinished;
          let checkTreatmentFinished = true;
          if(showResultWhenTreatmentFinished) {
            checkTreatmentFinished = await this.queryBus.execute(new CheckTreatmentFinishedByTreatmentIdQuery(treatmentId));
        }

        for (const parent of result) {
            const allDocIds = (parent.medicines || []).flatMap((child: any) => child.documentIds || []);
            parent.documentIds = Array.from(new Set(allDocIds));
            if(showResultWhenTreatmentFinished && !checkTreatmentFinished) {
                parent.documentIds = [];
            }

            if (parent.medicines) {
                for (const child of parent.medicines) {
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