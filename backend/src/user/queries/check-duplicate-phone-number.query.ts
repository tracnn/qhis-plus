import { IQuery } from "@nestjs/cqrs";

export class CheckDuplicatePhoneNumberQuery implements IQuery {
    constructor(public readonly phoneNumber: string) {}
}