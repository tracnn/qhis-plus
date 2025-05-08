import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ITheBhytRepository } from '../../domain/interfaces/the-bhyt.repository.interface';
import { ICheckHeinCardRepository } from '../../domain/interfaces/check-hein-card.repository.interface';
import { CheckTheBhytDto } from '../dtos/check-the-bhyt.dto';
import { ITheBhytValidator } from '../../domain/interfaces/the-bhyt-validator.interface';
import { CheckHeinCard } from '../../domain/entities/check-hein-card.entity';
import { CheckHeinCardService } from '../../domain/services/check-hein-card.service';
import { CheckHeinCardValidatorService } from '../../domain/services/check-hein-card-validator.service';
import { IBhxhAuthService } from '../../infrastructure/interfaces/bhxh-auth.service.interface';

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
    // Validate all fields
    const validationResults = [
      this.validatorService.validateMaThe(params.maThe),
      this.validatorService.validateHoTen(params.hoTen),
      this.validatorService.validateNgaySinh(params.ngaySinh),
      this.validatorService.validateGioiTinh(params.gioiTinh)
    ];

    // Collect all validation errors
    const validationErrors = validationResults
      .filter(result => !result.isValid)
      .map(result => ({
        field: result.fieldName,
        message: result.errorMessage
      }));

    // If there are any errors, throw them all at once
    if (validationErrors.length > 0) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        validationErrors
      });
    }

    // Kiểm tra điều kiện trước khi check thẻ
    const shouldCheck = await this.checkHeinCardValidatorService.shouldCheckTheBhyt(params.ma_lk);
       
    if (shouldCheck && params.ma_lk) {
      // Nếu không cần check thì lấy kết quả từ database
      const existingCard = await this.checkHeinCardRepo.findByMaLk(params.ma_lk);
      
      if (existingCard) {
        return existingCard
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

    // Lưu kết quả kiểm tra nếu có ma_lk
    if (params.ma_lk) {
      await this.checkHeinCardService.saveCheckResult({
        ma_lk: params.ma_lk,
        maTracuu: checkResult.maKetQua,
        maKiemtra,
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
