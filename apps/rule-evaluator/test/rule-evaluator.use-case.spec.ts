import { RuleEvaluatorUseCase } from '../src/application/use-cases/rule-evaluator.use-case';
import { IRuleEvaluatorRepository } from '../src/application/interfaces/outbound/rule-evaluator.repository.interface';

describe('RuleEvaluatorUseCase', () => {
  let useCase: RuleEvaluatorUseCase;

  beforeEach(() => {
    const mockRepo: IRuleEvaluatorRepository = {
      findById: jest.fn().mockResolvedValue({ id: '1', value: 'mock' }),
    };
    useCase = new RuleEvaluatorUseCase(mockRepo);
  });

  it('should execute without error', async () => {
    const result = await useCase.execute({ id: '1', value: 'test' });
    expect(result).toBeUndefined();
  });
});
