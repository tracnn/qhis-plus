import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { BASE_SCHEMA } from "../../constant/common.constant";
import { GetTransactionByIdQuery } from "./get-transaction-by-id.query";
import { NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "../../common/error-messages/error-404";

@QueryHandler(GetTransactionByIdQuery)
export class GetTransactionByIdHandler implements IQueryHandler<GetTransactionByIdQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
    ) {}
    async execute(query: GetTransactionByIdQuery) {
        const { transactionId } = query;

        const queryData = `
            SELECT
                ID AS "transactionId",
                TRANSACTION_CODE AS "transactionCode",
                INVOICE_LOOKUP_CODE AS "invoiceLookupCode",
                INVOICE_SYS AS "invoiceSys",
                TDL_PATIENT_CODE AS "patientCode",
                TDL_TREATMENT_CODE AS "treatmentCode"
            FROM
                HIS_TRANSACTION
            WHERE
                ID = :P1
                AND IS_DELETE = 0
                AND CANCEL_TIME IS NULL
                AND INVOICE_LOOKUP_CODE IS NOT NULL
        `
        const resultData = await this.dataSource.query(queryData, [transactionId]);

        const result = resultData[0];

        if (!result) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_TRANSACTION);
        }

        return result;
    }
}