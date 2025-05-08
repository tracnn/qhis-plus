import { TheBhyt } from '../../../domain/entities/the-bhyt.entity';

export interface ITheBhytUseCase {
  execute(input: Partial<TheBhyt>): Promise<any>;
  hello(): Promise<string>;
}
