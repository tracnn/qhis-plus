import { Injectable, Inject } from '@nestjs/common';
import { ICheckHeinCardRepository } from '../../domain/interfaces/check-hein-card.repository.interface';
import { ICheckHeinCardDomainValidator } from '../../domain/services/check-hein-card-validator.service';

// Application Service Interface
export interface ICheckHeinCardValidatorService {
  shouldCheckTheBhyt(maLk: string): Promise<boolean>;
}

@Injectable()
export class CheckHeinCardValidatorService implements ICheckHeinCardValidatorService {
  constructor(
    @Inject('ICheckHeinCardRepository')
    private readonly checkHeinCardRepository: ICheckHeinCardRepository,
    @Inject('ICheckHeinCardDomainValidator')
    private readonly domainValidator: ICheckHeinCardDomainValidator
  ) {}

  async shouldCheckTheBhyt(maLk: string): Promise<boolean> {
    if (!maLk) {
      return true; // Nếu không có maLk thì luôn check
    }

    const existingCard = await this.checkHeinCardRepository.findByMaLk(maLk);
    
    if (!existingCard) {
      return true; // Nếu chưa có bản ghi thì cần check
    }

    // Sử dụng domain service để validate
    return this.domainValidator.validateCardStatus(existingCard);
  }
} 