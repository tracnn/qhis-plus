import { Tracnn } from '../../../domain/entities/tracnn.entity';

export interface ITracnnUseCase {
  execute(input: Partial<Tracnn>): Promise<any>;
  hello(): Promise<string>;
}
