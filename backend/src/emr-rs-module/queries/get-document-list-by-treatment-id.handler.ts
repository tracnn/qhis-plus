import { IQueryHandler, QueryHandler, QueryBus } from "@nestjs/cqrs";
import { GetDocumentListByTreatmentIdDto } from "../dto/get-document-list-by-treatment-id.dto";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA, EMR_DOCUMENT_TYPE_RETURN_TO_PATIENT } from "../../constant/common.constant";
import { GetDocumentListByTreatmentIdQuery } from "./get-document-list-by-treatment-id.query";
import { GetTreatmentByTreatmentIdQuery } from "../../his-rs-module/queries/get-treatment-by-treatment-id.query";
import { ERROR_404 } from "@common/error-messages/error-404";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetDocumentListByTreatmentIdQuery)
export class GetDocumentListByTreatmentIdHandler implements IQueryHandler<GetDocumentListByTreatmentIdQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.EMR_RS)
        private readonly dataSource: DataSource,
        private readonly queryBus: QueryBus
    ) {}

    async execute(query: GetDocumentListByTreatmentIdQuery): Promise<any> {
        const { getDocumentListByTreatmentIdDto } = query;
        const { treatmentId, page, limit } = getDocumentListByTreatmentIdDto;

        const treatment = await this.queryBus.execute(new GetTreatmentByTreatmentIdQuery(treatmentId));

        if (!treatment) {
            throw new NotFoundException([ ERROR_404.NOT_FOUND_TREATMENT ]);
        }

        const documentTypeIds = EMR_DOCUMENT_TYPE_RETURN_TO_PATIENT.join(',');

        const emrDocuments = await this.dataSource.query(
            `
                SELECT 
                    ED.ID AS "id",
                    ED.DOCUMENT_NAME AS "documentName",
                    EDT.DOCUMENT_TYPE_NAME AS "documentTypeName",
                    ED.REQUEST_USERNAME AS "requestUsername",
                    ED.HIS_CODE AS "hisCode"
                FROM 
                    EMR_DOCUMENT ED
                JOIN
                    EMR_DOCUMENT_TYPE EDT ON EDT.ID = ED.DOCUMENT_TYPE_ID
                WHERE
                    ED.TREATMENT_CODE = :P1
                    AND ED.IS_DELETE = 0
                    AND ED.DOCUMENT_TYPE_ID IN (${documentTypeIds})
            `,
            [treatment.treatmentCode],
        );

        return emrDocuments;
    }
}
