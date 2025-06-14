import { ICommand } from "@nestjs/cqrs";
import { UpdateSatisfactionSurveyDto } from "../dto/update-satisfaction-survey.dto";

export class UpdateSatisfactionSurveyTreatmentCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly satisfactionSurveyId: string,
        public readonly updateSatisfactionSurveyDto: UpdateSatisfactionSurveyDto,
    ) {}
}