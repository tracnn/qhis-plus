import { Injectable, Inject } from '@nestjs/common';
import { ICheckHeinCardRepository } from '../../domain/interfaces/check-hein-card.repository.interface';
import { GetCheckHeinCardsDto } from '../dtos/get-check-hein-cards.dto';

@Injectable()
export class CheckHeinCardQueryService {
  constructor(
    @Inject('ICheckHeinCardRepository')
    private readonly checkHeinCardRepository: ICheckHeinCardRepository,
  ) {}

  async getCheckHeinCards(params: GetCheckHeinCardsDto) {
    const { startDate, endDate, maKetQua, page, limit } = params;
    console.log(startDate, endDate, maKetQua, page, limit);
    return this.checkHeinCardRepository.findWithFilters({
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        maKetQua,
        page,
        limit,
    });
  }
} 