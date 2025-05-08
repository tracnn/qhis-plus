import { Inject, Injectable } from '@nestjs/common';
import { IRuleEvaluatorUseCase } from '../interfaces/inbound/rule-evaluator.usecase.interface';
import { IRuleEvaluatorRepository } from '../interfaces/outbound/rule-evaluator.repository.interface';
import { RuleEvaluator } from '../../domain/entities/rule-evaluator.entity';
import { RuleEvaluatorDto } from '../dtos/rule-evaluator.dto';

@Injectable()
export class RuleEvaluatorUseCase implements IRuleEvaluatorUseCase {
  constructor(
	  @Inject('IRuleEvaluatorRepository') private readonly repo: IRuleEvaluatorRepository
  ) {}

  async hello(): Promise<string> {
    return 'Hello';
  }
  
  async execute(input: RuleEvaluatorDto): Promise<any> {
    return 'Hello';
  }
}
