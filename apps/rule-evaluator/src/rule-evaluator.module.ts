import { Module } from '@nestjs/common';
import { RuleEvaluatorController } from './rule-evaluator.controller';
import { RuleEvaluatorService } from './rule-evaluator.service';

@Module({
  imports: [],
  controllers: [RuleEvaluatorController],
  providers: [RuleEvaluatorService],
})
export class RuleEvaluatorModule {}
