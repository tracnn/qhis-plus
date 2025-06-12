import { ICommand } from "@nestjs/cqrs";
import { UpdateSatisfactionSurveyServiceDto } from "../dto/update-satisfaction-survey-service.dto";

export class UpdateSatisfactionSurveyServiceCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly satisfactionSurveyId: string,
        public readonly updateSatisfactionSurveyDto: UpdateSatisfactionSurveyServiceDto,
    ) {}
}