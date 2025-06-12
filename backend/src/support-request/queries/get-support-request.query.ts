import { IQuery } from "@nestjs/cqrs";

export class GetSupportRequestQuery implements IQuery {
    constructor(public readonly id: string, public readonly userId: string) {}
}