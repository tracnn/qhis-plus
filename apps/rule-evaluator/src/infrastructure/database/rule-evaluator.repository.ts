import { Injectable } from '@nestjs/common';
import { IRuleEvaluatorRepository } from '../../application/interfaces/outbound/rule-evaluator.repository.interface';
import { RuleEvaluator } from '../../domain/entities/rule-evaluator.entity';

export class RuleEvaluatorRepository implements IRuleEvaluatorRepository {
  async findById(id: string): Promise<RuleEvaluator | null> {
    return new RuleEvaluator(id, 'demo-value');
  }
  async save(entity: RuleEvaluator): Promise<void> {
    console.log('Saved', entity);
  }
}
