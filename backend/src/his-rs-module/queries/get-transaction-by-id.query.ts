import { IQuery } from "@nestjs/cqrs";

export class GetTransactionByIdQuery implements IQuery {
    constructor(public readonly transactionId: number) {}
}