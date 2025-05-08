import { RuleEvaluator } from '../../../domain/entities/rule-evaluator.entity';

export interface IRuleEvaluatorUseCase {
  execute(input: Partial<RuleEvaluator>): Promise<any>;
  hello(): Promise<string>;
}
