import { RuleEvaluator } from '../entities/rule-evaluator.entity';

export class RuleEvaluatorDomainService {
  static isActive(entity: RuleEvaluator): boolean {
    return !!entity && entity.value !== '';
  }
}
