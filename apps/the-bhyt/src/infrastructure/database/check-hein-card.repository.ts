import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICheckHeinCardRepository } from '../../domain/interfaces/check-hein-card.repository.interface';
import { CheckHeinCard } from '../../domain/entities/check-hein-card.entity';

@Injectable()
export class CheckHeinCardRepository implements ICheckHeinCardRepository {
  constructor(
    @InjectRepository(CheckHeinCard)
    private readonly repository: Repository<CheckHeinCard>,
  ) {}

  async save(card: CheckHeinCard): Promise<CheckHeinCard> {
    return this.repository.save(card);
  }

  async findByMaLk(ma_lk: string): Promise<CheckHeinCard | null> {
    return await this.repository.findOne({ where: { ma_lk } });
  }

  async findByMaLkAndMaThe(ma_lk: string, ma_the: string): Promise<CheckHeinCard | null> {
    return await this.repository.findOne({ where: { ma_lk, ma_the } });
  }
} 