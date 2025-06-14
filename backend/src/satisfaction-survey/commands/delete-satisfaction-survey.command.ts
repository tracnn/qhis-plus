import { ICommand } from "@nestjs/cqrs";

export class DeleteSatisfactionSurveyTreatmentCommand implements ICommand {
    constructor(public readonly satisfactionSurveyId: string, public readonly userId: string) {}
}