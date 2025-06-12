import { IQuery } from "@nestjs/cqrs";

export class AdminMeQuery implements IQuery {
    constructor(public readonly userId: number) {}
}