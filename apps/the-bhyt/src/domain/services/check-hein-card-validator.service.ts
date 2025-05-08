import { Injectable, Inject } from '@nestjs/common';
import { ICheckHeinCardRepository } from '../interfaces/check-hein-card.repository.interface';
import { MaTracuuKHL, MaKiemtraKHL } from '../constants/check-hein-card.constants';

@Injectable()
export class CheckHeinCardValidatorService {
  constructor(
    @Inject('ICheckHeinCardRepository')
    private readonly checkHeinCardRepository: ICheckHeinCardRepository
  ) {}

  async shouldCheckTheBhyt(ma_lk: string): Promise<boolean> {
    if (!ma_lk) {
      return true; // Nếu không có ma_lk thì luôn check
    }

    const existingCard = await this.checkHeinCardRepository.findByMaLk(ma_lk);
    
    if (!existingCard) {
      return true; // Nếu chưa có bản ghi thì cần check
    }

    // Kiểm tra điều kiện ma_tracuu hoặc ma_kiemtra
    const isValidTracuu = Object.values(MaTracuuKHL).includes(existingCard.ma_tracuu as MaTracuuKHL);
    const isValidKiemtra = Object.values(MaKiemtraKHL).includes(existingCard.ma_kiemtra as MaKiemtraKHL);
    
    return !(isValidTracuu || isValidKiemtra);
  }
} 