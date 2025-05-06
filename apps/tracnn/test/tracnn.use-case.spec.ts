import { TracnnUseCase } from '../src/application/use-cases/tracnn.use-case';
import { ITracnnRepository } from '../src/application/ports/outbound/tracnn.repository.interface';

describe('TracnnUseCase', () => {
  let useCase: TracnnUseCase;

  beforeEach(() => {
    const mockRepo: ITracnnRepository = {
      findById: jest.fn().mockResolvedValue({ id: '1', value: 'mock' }),
    };
    useCase = new TracnnUseCase(mockRepo);
  });

  it('should execute without error', async () => {
    const result = await useCase.execute({ id: '1', value: 'test' });
    expect(result).toBeUndefined();
  });
});
