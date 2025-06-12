import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPacsLinkByTreatmentIdQuery } from "./get-pacs-link-by-treatment-id.query";
import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA, SERVICE_TYPE_ID_PACS, VRPACS_INTERNAL_URL, VRPACS_EXTERNAL_URL, 
    SERVICE_REQ_STATUS_HAS_END_TIME, SERVICE_PACS_NOT_CAPTURE } from "../../constant/common.constant";
import { NotFoundException } from "@nestjs/common";
import axios from "axios";
import { ERROR_404 } from "@common/error-messages/error-404";

@QueryHandler(GetPacsLinkByTreatmentIdQuery)
export class GetPacsLinkByTreatmentIdHandler implements IQueryHandler<GetPacsLinkByTreatmentIdQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
    ) {}
    
    async execute(query: GetPacsLinkByTreatmentIdQuery): Promise<any> {
        const { treatmentId } = query.body;
       
        const serviceTypeIds = SERVICE_TYPE_ID_PACS.join(',');
        const serviceReqStatusCompleted = SERVICE_REQ_STATUS_HAS_END_TIME.join(',');
        const pacsLinks = await this.dataSource.query(
            `
            SELECT
                HSS.ID AS "id",
                HSS.TDL_SERVICE_NAME AS "serviceName"
            FROM
                HIS_SERE_SERV HSS
            JOIN
                HIS_SERVICE_REQ HSR ON HSR.ID = HSS.SERVICE_REQ_ID
            WHERE
                HSR.TREATMENT_ID = :P1
                AND HSR.IS_DELETE = 0
                AND HSS.IS_DELETE = 0
                AND HSR.IS_NO_EXECUTE IS NULL
                AND HSS.TDL_SERVICE_TYPE_ID IN (${serviceTypeIds})
                AND HSR.SERVICE_REQ_STT_ID IN (${serviceReqStatusCompleted})
            `, [treatmentId]);
        
        if (pacsLinks.length === 0) {
            return [];
        }
        const results = await Promise.all(pacsLinks.map(async (item: any) => {
            const viewerLink = await this.getPacsViewerLink(item.id); // <- gọi sang PACS
            return {
                id: item.id,
                serviceName: item.serviceName,
                link: viewerLink, // <-- đây là link thật đã có token/bảo mật
            }
        }));

        return results;
    }

    async getPacsViewerLink(serviceID: number): Promise<any> {
        const apiUrl = VRPACS_INTERNAL_URL;
        try {
            const response = await axios.get(apiUrl, { params: { serviceID } });
            if (response.status >= 400 || response.data === SERVICE_PACS_NOT_CAPTURE) {
                return null;
            }
            let finalUrl = response.request?.path;
            if (!finalUrl) {
                return null;
            }
            return finalUrl.startsWith('https') ? finalUrl : `${VRPACS_EXTERNAL_URL}${finalUrl}`;
        } catch (error) {
            return null;
        }
    }
}
