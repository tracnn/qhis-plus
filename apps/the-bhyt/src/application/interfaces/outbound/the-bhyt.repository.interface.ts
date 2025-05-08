import { TheBhyt } from '../../../domain/entities/the-bhyt.entity';

export interface ITheBhytRepository {
  findById(id: string): Promise<TheBhyt | null>;
  save(data: TheBhyt): Promise<void>;
}
