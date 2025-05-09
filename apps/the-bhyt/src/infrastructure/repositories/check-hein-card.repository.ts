import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckHeinCard } from '../../domain/entities/check-hein-card.entity';
import { ICheckHeinCardRepository } from '../../domain/interfaces/check-hein-card.repository.interface';
import { CheckHeinCardModel } from '../database/models/check-hein-card.model';

@Injectable()
export class CheckHeinCardRepository implements ICheckHeinCardRepository {
  constructor(
    @InjectRepository(CheckHeinCardModel)
    private readonly repository: Repository<CheckHeinCardModel>,
  ) {}

  async findByMaLk(ma_lk: string): Promise<CheckHeinCard | null> {
    const model = await this.repository.findOne({ where: { ma_lk } });
    return model ? model.toEntity() : null;
  }

  async findByMaLkAndMaThe(ma_lk: string, ma_the: string): Promise<CheckHeinCard | null> {
    const model = await this.repository.findOne({ 
      where: { 
        ma_lk,
        ma_the 
      } 
    });
    return model ? model.toEntity() : null;
  }

  async save(checkHeinCard: CheckHeinCard): Promise<CheckHeinCard> {
    const model = CheckHeinCardModel.fromEntity(checkHeinCard);
    const savedModel = await this.repository.save(model);
    return savedModel.toEntity();
  }

  async findWithFilters(params: {
    startDate?: Date;
    endDate?: Date;
    maKetQua?: string[];
    page?: number;
    limit?: number;
  }): Promise<{
    items: CheckHeinCard[];
    total: number;
  }> {
    const { startDate, endDate, maKetQua, page = 1, limit = 10 } = params;

    const queryBuilder = this.repository.createQueryBuilder('check_hein_cards');

    // Add filters
    if (startDate && endDate) {
      // Set endDate to end of day
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);

      // Set startDate to start of day
      const startOfDay = new Date(startDate);
      startOfDay.setHours(0, 0, 0, 0);

      queryBuilder.andWhere('check_hein_cards.updated_at BETWEEN :startDate AND :endDate', {
        startDate: startDate,
        endDate: startDate,
      });
    }

    if (maKetQua && maKetQua.length > 0) {
      queryBuilder.andWhere('check_hein_cards.ma_ketqua IN (:...maKetQua)', {
        maKetQua,
      });
    }
    console.log(queryBuilder.getQueryAndParameters());
    // Add pagination
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Get total count
    const total = await queryBuilder.getCount();

    // Get items
    const models = await queryBuilder.getMany();
    const items = models.map(model => model.toEntity());

    return {
      items,
      total,
    };
  }
} 