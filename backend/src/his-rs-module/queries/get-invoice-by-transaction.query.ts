import { IQuery } from "@nestjs/cqrs";
import { GetInvoiceByTransactionDto } from "../dto/get-invoice-by-transaction.dto";

export class GetInvoiceByTransactionQuery implements IQuery {
    constructor(
        public readonly userId: string,
        public readonly getInvoiceByTransactionDto: GetInvoiceByTransactionDto) {}
}