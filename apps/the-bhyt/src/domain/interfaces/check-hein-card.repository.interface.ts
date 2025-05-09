import { CheckHeinCard } from '../entities/check-hein-card.entity';

export interface ICheckHeinCardRepository {
  save(card: CheckHeinCard): Promise<CheckHeinCard>;
  findByMaLk(ma_lk: string): Promise<CheckHeinCard | null>;
  findByMaLkAndMaThe(ma_lk: string, ma_the: string): Promise<CheckHeinCard | null>;
  findWithFilters(params: {
    startDate?: Date;
    endDate?: Date;
    maKetQua?: string[];
    page?: number;
    limit?: number;
  }): Promise<{
    items: CheckHeinCard[];
    total: number;
  }>;
} 