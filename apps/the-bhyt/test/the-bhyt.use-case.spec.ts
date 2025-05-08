import { TheBhytUseCase } from '../src/application/use-cases/the-bhyt.use-case';
import { ITheBhytRepository } from '../src/application/ports/outbound/the-bhyt.repository.interface';

describe('TheBhytUseCase', () => {
  let useCase: TheBhytUseCase;

  beforeEach(() => {
    const mockRepo: ITheBhytRepository = {
      findById: jest.fn().mockResolvedValue({ id: '1', value: 'mock' }),
    };
    useCase = new TheBhytUseCase(mockRepo);
  });

  it('should execute without error', async () => {
    const result = await useCase.execute({ id: '1', value: 'test' });
    expect(result).toBeUndefined();
  });
});
