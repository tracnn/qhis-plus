import { Module } from '@nestjs/common';
import { RuleEvaluatorController } from './presentation/controllers/rule-evaluator.controller';
import { RuleEvaluatorUseCase } from './application/use-cases/rule-evaluator.use-case';
import { RuleEvaluatorRepository } from './infrastructure/database/rule-evaluator.repository';
import { JsonRuleEvaluatorService } from './infrastructure/services/json-rule-evaluator.service';

@Module({
  controllers: [RuleEvaluatorController],
  providers: [
    {
      provide: 'IRuleEvaluatorUseCase',
      useClass: RuleEvaluatorUseCase,
    },
    {
      provide: 'IRuleEvaluatorRepository',
      useClass: RuleEvaluatorRepository,
    },
    {
      provide: 'IRuleEvaluator',
      useClass: JsonRuleEvaluatorService,
    },
  ],
})
export class AppModule {} 
