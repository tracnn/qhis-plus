import { Injectable } from '@nestjs/common';
import { CreateSatisfactionSurveyDto } from './dto/create-satisfaction-survey.dto';
import { UpdateSatisfactionSurveyDto } from './dto/update-satisfaction-survey.dto';
import { CreateSatisfactionSurveyCommand } from './commands/create-satisfaction-survey.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateSatisfactionSurveyTreatmentCommand } from './commands/update-satisfaction-survey.command';
import { GetSatisfactionSurveyTreatmentQuery } from './queries/get-satisfaction-survey-treatment.query';
import { GetSatisfactionSurveyTreatmentByIdQuery } from './queries/get-satisfaction-survey-treatment-by-id.query';
import { DeleteSatisfactionSurveyTreatmentCommand } from './commands/delete-satisfaction-survey.command';
import { GetSatisfactionSurveyTreatmentDto } from './dto/get-satisfaction-survey.dto';
import { GetSatisfactionSurveyTreatmentByTreatmentCodeQuery } from './queries/get-satisfaction-survey-treatment-by-treatment-code.query';
import { GetSatisfactionSurveyTreatmentByTreatmentCodeDto } from './dto/get-satisfaction-survey-by-treatment.dto';

@Injectable()
export class SatisfactionSurveyService {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  createTreatmentSurvey(userId: string, createSatisfactionSurveyDto: CreateSatisfactionSurveyDto) {
    return this.commandBus.execute(new CreateSatisfactionSurveyCommand(userId, createSatisfactionSurveyDto));
  }

  findAllTreatmentSurveys(userId: string, getSatisfactionSurveyTreatmentDto: GetSatisfactionSurveyTreatmentDto) {
    return this.queryBus.execute(new GetSatisfactionSurveyTreatmentQuery(userId, getSatisfactionSurveyTreatmentDto));
  }

  findOneTreatmentSurvey(satisfactionSurveyId: string, userId: string) {
    return this.queryBus.execute(new GetSatisfactionSurveyTreatmentByIdQuery(satisfactionSurveyId, userId));
  }

  updateTreatmentSurvey(satisfactionSurveyId: string, userId: string, updateSatisfactionSurveyDto: UpdateSatisfactionSurveyDto) {
    return this.commandBus.execute(new UpdateSatisfactionSurveyTreatmentCommand(
      satisfactionSurveyId, userId, updateSatisfactionSurveyDto));
  }

  deleteTreatmentSurvey(userId: string, satisfactionSurveyId: string) {
    return this.commandBus.execute(new DeleteSatisfactionSurveyTreatmentCommand(userId, satisfactionSurveyId));
  }

  findOneTreatmentSurveyByTreatmentCode(userId: string, getSatisfactionSurveyTreatmentByTreatmentCodeDto: GetSatisfactionSurveyTreatmentByTreatmentCodeDto) {
    return this.queryBus.execute(new GetSatisfactionSurveyTreatmentByTreatmentCodeQuery(userId, 
      getSatisfactionSurveyTreatmentByTreatmentCodeDto));
  }

}
