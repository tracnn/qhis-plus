import { Injectable } from '@nestjs/common';
import { MaTracuuKHL, MaKiemtraKHL } from '../constants/check-hein-card.constants';
import { CheckHeinCard } from '../entities/check-hein-card.entity';

// Domain Service Interface
export interface ICheckHeinCardDomainValidator {
  validateCardStatus(card: CheckHeinCard): boolean;
}

@Injectable()
export class CheckHeinCardDomainValidator implements ICheckHeinCardDomainValidator {
  validateCardStatus(card: CheckHeinCard): boolean {
    const isValidTracuu = Object.values(MaTracuuKHL).includes(card.getMaTraCuu() as MaTracuuKHL);
    const isValidKiemtra = Object.values(MaKiemtraKHL).includes(card.getMaKiemTra() as MaKiemtraKHL);
    
    return !(isValidTracuu || isValidKiemtra);
  }
} 