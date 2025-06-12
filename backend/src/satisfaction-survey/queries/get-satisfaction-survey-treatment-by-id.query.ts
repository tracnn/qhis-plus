import { IQuery } from "@nestjs/cqrs";

export class GetSatisfactionSurveyTreatmentByIdQuery implements IQuery {
    constructor(public readonly satisfactionSurveyId: string, public readonly userId: string) {}
}