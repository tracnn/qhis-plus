import { IQuery } from "@nestjs/cqrs";
import { ValidateCredentialsDto } from "../dto/validate-credentials";

export class ValidateCredentialsCommand implements IQuery {
    constructor(public readonly dto: ValidateCredentialsDto) {}
}