import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetInvoiceByTransactionQuery } from "./get-invoice-by-transaction.query";
import { InjectDataSource } from "@nestjs/typeorm";
import { BASE_SCHEMA } from "../../constant/common.constant";
import { DataSource } from "typeorm";
import { InvoiceTypeBySystem } from "../enums/invoice-type.enum";
import { CyberBillBachMaiService } from "../services/cyber-bill-bach-mai.service";
import { ERROR_404 } from "@common/error-messages/error-404";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetInvoiceByTransactionQuery)
export class GetInvoiceByTransactionHandler implements IQueryHandler<GetInvoiceByTransactionQuery> {
    constructor(
        @InjectDataSource(BASE_SCHEMA.HIS_RS) private readonly dataSource: DataSource,
        private readonly cyberBillBachMaiService: CyberBillBachMaiService
    ) {}
    async execute(query: GetInvoiceByTransactionQuery) {
        const { getInvoiceByTransactionDto } = query;

        const queryData = `
            SELECT
                ID AS "transactionId",
                TRANSACTION_CODE AS "transactionCode",
                INVOICE_LOOKUP_CODE AS "invoiceLookupCode",
                INVOICE_SYS AS "invoiceSys"
            FROM
                HIS_TRANSACTION
            WHERE
                ID = :P1
                AND IS_DELETE = 0
                AND CANCEL_TIME IS NULL
                AND INVOICE_LOOKUP_CODE IS NOT NULL
        `
        const result = await this.dataSource.query(queryData, [getInvoiceByTransactionDto.transactionId]);

        if (!result) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_TRANSACTION);
        }

        let invoice = null;
        switch (result[0].invoiceSys) {
            case InvoiceTypeBySystem.CYBERBILL:
                invoice = await this.cyberBillBachMaiService.getInvoicePdf(
                    result[0].invoiceLookupCode, result[0].transactionCode);
                break;
            default:
                throw new NotFoundException(ERROR_404.NOT_FOUND_INVOICE_TYPE);
        }
        return {
            base64: invoice
        };
    }
}