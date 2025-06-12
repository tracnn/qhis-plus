import { ICommand } from "@nestjs/cqrs";
import { CreateSatisfactionSurveyDto } from "../dto/create-satisfaction-survey.dto";

export class CreateSatisfactionSurveyTreatmentCommand implements ICommand {
    constructor(
        public readonly userId: string,
        public readonly createSatisfactionSurveyDto: CreateSatisfactionSurveyDto,
    ) {}
}