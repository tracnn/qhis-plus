import { IQuery } from "@nestjs/cqrs";

export class GetSatisfactionSurveyServiceByIdQuery implements IQuery {
    constructor(public readonly satisfactionSurveyId: string, public readonly userId: string) {}
}