import { Injectable } from '@nestjs/common';
import { RuleRepository } from './rule/rule.repository';

@Injectable()
export class RuleEvaluatorService {
  constructor(private readonly ruleRepository: RuleRepository) {}
  getHello(): string {
    return 'Hello World! Rule-Evaluator';
  }
}