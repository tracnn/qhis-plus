import { Injectable, Inject } from '@nestjs/common';
import { ITheBhytRepository } from '../../domain/interfaces/the-bhyt.repository.interface';
import { ICheckHeinCardRepository } from '../../domain/interfaces/check-hein-card.repository.interface';
import { CheckTheBhytDto } from '../dtos/check-the-bhyt.dto';
import { ITheBhytValidator } from '../../domain/interfaces/the-bhyt-validator.interface';
import { CheckHeinCard } from '../../domain/entities/check-hein-card.entity';
import { CheckHeinCardService } from '../../domain/services/check-hein-card.service';
import { CheckHeinCardValidatorService } from '../services/check-hein-card-validator.service';
import { IBhxhAuthService } from '../../domain/interfaces/bhxh-auth.service.interface';

@Injectable()
export class TheBhytUseCase {
  constructor(
    @Inject('ITheBhytRepository') private readonly repo: ITheBhytRepository,
    @Inject('ICheckHeinCardRepository') private readonly checkHeinCardRepo: ICheckHeinCardRepository,
    @Inject('ICheckHeinCardService') private readonly checkHeinCardService: CheckHeinCardService,
    @Inject('IBhxhAuthService') private readonly authService: IBhxhAuthService,
    @Inject('ITheBhytValidator') private readonly validatorService: ITheBhytValidator,
    private readonly checkHeinCardValidatorService: CheckHeinCardValidatorService,
  ) {}

  async checkTheBhyt(params: CheckTheBhytDto) {
    // Kiểm tra điều kiện trước khi check thẻ
    const shouldCheck = await this.checkHeinCardValidatorService.shouldCheckTheBhyt(params.maLk);
    
    if (shouldCheck && params.maLk) {
      // Nếu không cần check thì lấy kết quả từ database
      const existingCard = await this.checkHeinCardRepo.findByMaLk(params.maLk);

      if (existingCard) {
        return existingCard;
      }
    }

    // Lấy token trước khi gọi repository
    const token = await this.authService.getToken();
    const idToken = await this.authService.getIdToken();
    
    const checkResult = await this.repo.checkTheBhyt({
      ...params,
      token,
      idToken
    });

    const maKiemtra = this.validatorService.validateTheBhyt(
      { maCSKCB: params.maCSKCB, gioiTinh: params.gioiTinh },
      checkResult
    );

    // Lưu kết quả kiểm tra nếu có maLk
    if (params.maLk) {
      await this.checkHeinCardService.saveCheckResult({
        maLk: params.maLk,
        maTracuu: checkResult.maKetQua,
        maKiemtra,
        maKetqua: checkResult.maKetQua,
        maThe: checkResult.maThe,
        ghiChu: checkResult.ghiChu,
        hoTen: params.hoTen,
        ngaySinh: params.ngaySinh,
        maCSKCB: params.maCSKCB,
        gioiTinh: params.gioiTinh,
        gtTheTu: checkResult.gtTheTu,
        gtTheDen: checkResult.gtTheDen,
        diaChi: checkResult.diaChi,
        maTheCu: checkResult.maTheCu,
        maTheMoi: checkResult.maTheMoi,
        cqBHXH: checkResult.cqBHXH,
        maKV: checkResult.maKV,
        ngayDu5Nam: checkResult.ngayDu5Nam,
        maSoBHXH: checkResult.maSoBHXH,
        gtTheTuMoi: checkResult.gtTheTuMoi,
        gtTheDenMoi: checkResult.gtTheDenMoi,
        maDKBDMoi: checkResult.maDKBDMoi,
        tenDKBDMoi: checkResult.tenDKBDMoi,
      });
    }

    return {
      ...checkResult,
      maKiemTra: maKiemtra
    };
  }
}
