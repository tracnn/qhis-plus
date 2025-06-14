import { ICommand } from "@nestjs/cqrs";

export class DeleteSatisfactionSurveyTreatmentCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly satisfactionSurveyId: string,
    ) {}
}