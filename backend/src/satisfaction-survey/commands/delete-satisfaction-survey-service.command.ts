import { ICommand } from "@nestjs/cqrs";

export class DeleteSatisfactionSurveyServiceCommand implements ICommand {
    constructor(
        public readonly satisfactionSurveyId: string,
        public readonly userId: string,
    ) {}
}