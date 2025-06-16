import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetInvoiceByTreatmentQuery } from "./get-invoice-by-treatment.query";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { BASE_SCHEMA } from "../../constant/common.constant";

@QueryHandler(GetInvoiceByTreatmentQuery)
export class GetInvoiceByTreatmentHandler implements IQueryHandler<GetInvoiceByTreatmentQuery> {

    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
    ) {}
    async execute(query: GetInvoiceByTreatmentQuery) {
        const {  getInvoiceByTreatmentDto } = query;

        const queryData = `
        SELECT
            ID AS "transactionId"
        FROM
            HIS_TRANSACTION
        WHERE
            treatment_id = :P1
            AND IS_DELETE = 0
            AND CANCEL_TIME IS NULL
            AND INVOICE_LOOKUP_CODE IS NOT NULL
        `
        const queryResult = await this.dataSource.query(queryData, [getInvoiceByTreatmentDto.treatmentId]);

        return (queryResult || []).map((item: any) => item.transactionId);
    }
}