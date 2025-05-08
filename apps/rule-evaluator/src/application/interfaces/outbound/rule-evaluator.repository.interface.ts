import { RuleEvaluator } from '../../../domain/entities/rule-evaluator.entity';

export interface IRuleEvaluatorRepository {
  findById(id: string): Promise<RuleEvaluator | null>;
  save(data: RuleEvaluator): Promise<void>;
}
