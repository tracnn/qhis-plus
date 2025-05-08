import { Injectable, Inject } from '@nestjs/common';
import { IRuleEvaluator } from '../../domain/interfaces/rule-evaluator.interface';

@Injectable()
export class EvaluateRulesUseCase {
  constructor(
    @Inject('IRuleEvaluator')
    private readonly ruleEvaluator: IRuleEvaluator
  ) {}

  async execute(facts: any) {
    return this.ruleEvaluator.evaluate(facts);
  }
} 