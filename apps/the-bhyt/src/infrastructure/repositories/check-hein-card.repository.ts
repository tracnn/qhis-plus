import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckHeinCard } from '../../domain/entities/check-hein-card.entity';
import { ICheckHeinCardRepository } from '../../domain/interfaces/check-hein-card.repository.interface';

@Injectable()
export class CheckHeinCardRepository implements ICheckHeinCardRepository {
  constructor(
    @InjectRepository(CheckHeinCard)
    private readonly repository: Repository<CheckHeinCard>,
  ) {}

  async findByMaLk(ma_lk: string): Promise<CheckHeinCard | null> {
    return this.repository.findOne({ where: { ma_lk } });
  }

  async findByMaLkAndMaThe(ma_lk: string, ma_the: string): Promise<CheckHeinCard | null> {
    return this.repository.findOne({ 
      where: { 
        ma_lk,
        ma_the 
      } 
    });
  }

  async save(checkHeinCard: Partial<CheckHeinCard>): Promise<CheckHeinCard> {
    return this.repository.save(checkHeinCard);
  }
} 