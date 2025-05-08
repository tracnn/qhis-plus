import { RuleEvaluator } from '../entities/rule-evaluator.entity';

export class RuleEvaluatorValidator {
  static validate(entity: RuleEvaluator): string[] {
    const errors: string[] = [];
    if (!entity.value || entity.value.trim() === '') {
      errors.push('Giá trị không được để trống.');
    }
    return errors;
  }
}
