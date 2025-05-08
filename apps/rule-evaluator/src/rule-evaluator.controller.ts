import { Controller, Get } from '@nestjs/common';
import { RuleEvaluatorService } from './rule-evaluator.service';

@Controller()
export class RuleEvaluatorController {
  constructor(private readonly ruleEvaluatorService: RuleEvaluatorService) {}

  @Get()
  getHello(): string {
    return this.ruleEvaluatorService.getHello();
  }
}
