import { Thaovh } from '../../../domain/entities/thaovh.entity';

export interface IThaovhRepository {
  findById(id: string): Promise<Thaovh | null>;
  save(data: Thaovh): Promise<void>;
}
