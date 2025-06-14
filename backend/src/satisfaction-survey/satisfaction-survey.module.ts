import { Module } from '@nestjs/common';
import { SatisfactionSurveyService } from './satisfaction-survey.service';
import { SatisfactionSurveyController } from './satisfaction-survey.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { BASE_SCHEMA } from 'src/constant/common.constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SatisfactionSurvey } from './entities/satisfaction-survey.entity';
import { CreateSatisfactionSurveyHandler } from './commands/create-satisfaction-survey.handler';
import { UpdateSatisfactionSurveyTreatmentHandler } from './commands/update-satisfaction-survey.handler';
import { GetSatisfactionSurveyTreatmentHandler } from './queries/get-satisfaction-survey-treatment.handler';
import { GetSatisfactionSurveyTreatmentByIdHandler } from './queries/get-satisfaction-survey-treatment-by-id.handler';
import { DeleteSatisfactionSurveyTreatmentHandler } from './commands/delete-satisfaction-survey.handler';
import { GetSatisfactionSurveyTreatmentByTreatmentCodeHandler } from './queries/get-satisfaction-survey-treatment-by-treatment-code.handler';

const CommandHandlers = [
  CreateSatisfactionSurveyHandler,
  UpdateSatisfactionSurveyTreatmentHandler,
  DeleteSatisfactionSurveyTreatmentHandler,
];

const QueryHandlers = [
  GetSatisfactionSurveyTreatmentHandler,
  GetSatisfactionSurveyTreatmentByIdHandler,
  GetSatisfactionSurveyTreatmentByTreatmentCodeHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([SatisfactionSurvey], BASE_SCHEMA.DEFAULT),
    CqrsModule,
  ],
  controllers: [SatisfactionSurveyController],
  providers: [SatisfactionSurveyService, ...CommandHandlers, ...QueryHandlers],
  exports: [CqrsModule],
})
export class SatisfactionSurveyModule {}
