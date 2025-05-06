import { ThaovhUseCase } from '../src/application/use-cases/thaovh.use-case';
import { IThaovhRepository } from '../src/application/ports/outbound/thaovh.repository.interface';

describe('ThaovhUseCase', () => {
  let useCase: ThaovhUseCase;

  beforeEach(() => {
    const mockRepo: IThaovhRepository = {
      findById: jest.fn().mockResolvedValue({ id: '1', value: 'mock' }),
    };
    useCase = new ThaovhUseCase(mockRepo);
  });

  it('should execute without error', async () => {
    const result = await useCase.execute({ id: '1', value: 'test' });
    expect(result).toBeUndefined();
  });
});
