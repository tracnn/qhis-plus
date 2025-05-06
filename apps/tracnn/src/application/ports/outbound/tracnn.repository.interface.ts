import { Tracnn } from '../../../domain/entities/tracnn.entity';

export interface ITracnnRepository {
  findById(id: string): Promise<Tracnn | null>;
  save(data: Tracnn): Promise<void>;
}