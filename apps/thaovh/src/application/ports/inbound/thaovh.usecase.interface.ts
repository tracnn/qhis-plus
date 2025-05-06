import { Thaovh } from '../../../domain/entities/thaovh.entity';

export interface IThaovhUseCase {
  execute(input: Partial<Thaovh>): Promise<any>;
  hello(): Promise<string>;
}
