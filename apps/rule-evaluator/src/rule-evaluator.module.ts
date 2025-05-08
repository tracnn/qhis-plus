import { Module } from '@nestjs/common';
import { RuleEvaluatorController } from './rule-evaluator.controller';
import { RuleEvaluatorService } from './rule-evaluator.service';
import { JsonRuleEvaluatorService } from './infrastructure/services/json-rule-evaluator.service';
import { EvaluateRulesUseCase } from './application/use-cases/evaluate-rules.use-case';

@Module({
  imports: [],
  controllers: [RuleEvaluatorController],
  providers: [
    RuleEvaluatorService,
    EvaluateRulesUseCase,
    {
      provide: 'IRuleEvaluator',
      useClass: JsonRuleEvaluatorService,
    },
  ],
  exports: [RuleEvaluatorService],
})
export class RuleEvaluatorModule {}
