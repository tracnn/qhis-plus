import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetDocumentByIdQuery } from "./get-document-by-id.query";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA, EMR_DOCUMENT_TYPE_RETURN_TO_PATIENT } from "../../constant/common.constant";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "../../common/error-messages/error-404";
import { ERROR_403 } from "../../common/error-messages/error-403";
import { CheckTreatmentFinishedByTreatmentCodeQuery } from "../../his-rs-module/queries/check-treatment-finished-by-treatment-code.query";
import { OrganizationConfigService } from "../../common/organization-config.service";

@QueryHandler(GetDocumentByIdQuery)
export class GetDocumentByIdHandler implements IQueryHandler<GetDocumentByIdQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.EMR_RS)
        private readonly dataSource: DataSource,
        private readonly queryBus: QueryBus,
        private readonly organizationConfigService: OrganizationConfigService
    ) {}

    async execute(query: GetDocumentByIdQuery): Promise<any> {
        const { getDocumentByIdDto } = query;
        const { documentId } = getDocumentByIdDto;

        const documentTypeIds = EMR_DOCUMENT_TYPE_RETURN_TO_PATIENT.join(',');
        
        const document = await this.dataSource.query(
            `
                SELECT 
                    ED.ID AS "id",
                    ED.DOCUMENT_NAME AS "documentName",
                    ED.DOCUMENT_FILE_TYPE AS "documentFileType",
                    ED.LAST_VERSION_URL AS "lastVersionUrl",
                    ET.TREATMENT_CODE AS "treatmentCode",
                    ET.PATIENT_CODE AS "patientCode",
                    EDT.DOCUMENT_TYPE_NAME AS "documentTypeName",
                    EDT.ID AS "documentTypeId",
                    ED.HIS_CODE AS "hisCode",
                    ED.CREATE_TIME AS "createTime",
                    ED.CREATOR AS "creator"
                FROM 
                    EMR_DOCUMENT ED
                JOIN
                    EMR_TREATMENT ET ON ET.ID = ED.TREATMENT_ID
                JOIN
                    EMR_DOCUMENT_TYPE EDT ON EDT.ID = ED.DOCUMENT_TYPE_ID
                WHERE 
                    ED.ID = :P1
                    AND ED.IS_DELETE = 0
                    AND ED.DOCUMENT_TYPE_ID IN (${documentTypeIds})
            `,
            [documentId],
        );

        if(!document) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_DOCUMENT);
        }

        if(this.organizationConfigService.showResultWhenTreatmentFinished) {
            const checkTreatmentFinished = await this.queryBus.execute(new CheckTreatmentFinishedByTreatmentCodeQuery(document?.[0]?.treatmentCode));
            if(!checkTreatmentFinished) {
                throw new ForbiddenException(ERROR_403.TREATMENT_NOT_FINISHED);
            }
        }

        return document;
    }
}
