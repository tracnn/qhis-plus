import { Tracnn } from '../../../domain/entities/tracnn.entity';

export interface ITracnnUseCase {
  execute(input: Partial<Tracnn>): Promise<any>; // Hoặc dùng Value Object nếu chuẩn hóa
  hello(): Promise<string>;
}