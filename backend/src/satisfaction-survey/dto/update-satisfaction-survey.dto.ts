import { PickType } from '@nestjs/swagger';
import { CreateSatisfactionSurveyDto } from './create-satisfaction-survey.dto';

export class UpdateSatisfactionSurveyDto extends PickType(CreateSatisfactionSurveyDto, ['surveyScore', 'surveyComment']) {}
