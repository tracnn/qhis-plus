import { Injectable, Inject } from '@nestjs/common';
import { CheckHeinCard } from '../entities/check-hein-card.entity';
import { ICheckHeinCardRepository } from '../interfaces/check-hein-card.repository.interface';

@Injectable()
export class CheckHeinCardService {
  constructor(
    @Inject('ICheckHeinCardRepository')
    private readonly checkHeinCardRepository: ICheckHeinCardRepository
  ) {}

  async saveCheckResult(params: {
    maLk: string;
    maKiemtra: string;
    maTracuu: string;
    maKetqua: string;
    maThe: string;
    ghiChu: string;
    hoTen: string;
    ngaySinh: string;
    maCSKCB: string;
    gioiTinh: string;
    gtTheTu: string;
    gtTheDen: string;
    diaChi: string;
    maTheCu: string;
    maTheMoi: string;
    cqBHXH: string;
    maKV: string;
    ngayDu5Nam: string;
    maSoBHXH: string;
    gtTheTuMoi: string;
    gtTheDenMoi: string;
    maDKBDMoi: string;
    tenDKBDMoi: string;
  }): Promise<void> {
    const now = new Date();
    
    // Kiểm tra xem đã tồn tại bản ghi với maLk chưa
    const existingCard = await this.checkHeinCardRepository.findByMaLk(params.maLk);
    
    if (existingCard) {
      // Nếu đã tồn tại thì update
      const updatedCard = new CheckHeinCard({
        id: existingCard.getId(),
        maLk: params.maLk,
        maTraCuu: params.maTracuu,
        maKiemTra: params.maKiemtra,
        maKetQua: params.maKetqua,
        ghiChu: params.ghiChu,
        maThe: params.maThe,
        hoTen: params.hoTen,
        ngaySinh: params.ngaySinh,
        diaChi: params.diaChi,
        maTheCu: params.maTheCu,
        maTheMoi: params.maTheMoi,
        maDkbd: params.maCSKCB,
        cqBhxh: params.cqBHXH,
        gioiTinh: params.gioiTinh,
        gtTheTu: params.gtTheTu,
        gtTheDen: params.gtTheDen,
        maKv: params.maKV,
        ngayDu5Nam: params.ngayDu5Nam,
        maSoBhxh: params.maSoBHXH,
        gtTheTuMoi: params.gtTheTuMoi,
        gtTheDenMoi: params.gtTheDenMoi,
        maDkbdMoi: params.maDKBDMoi,
        tenDkbdMoi: params.tenDKBDMoi,
        createdAt: existingCard.getCreatedAt(),
        updatedAt: now,
      });

      await this.checkHeinCardRepository.save(updatedCard);
    } else {
      // Nếu chưa tồn tại thì tạo mới
      const newCard = new CheckHeinCard({
        maLk: params.maLk,
        maTraCuu: params.maTracuu,
        maKiemTra: params.maKiemtra,
        maKetQua: params.maKetqua,
        ghiChu: params.ghiChu,
        maThe: params.maThe,
        hoTen: params.hoTen,
        ngaySinh: params.ngaySinh,
        diaChi: params.diaChi,
        maTheCu: params.maTheCu,
        maTheMoi: params.maTheMoi,
        maDkbd: params.maCSKCB,
        cqBhxh: params.cqBHXH,
        gioiTinh: params.gioiTinh,
        gtTheTu: params.gtTheTu,
        gtTheDen: params.gtTheDen,
        maKv: params.maKV,
        ngayDu5Nam: params.ngayDu5Nam,
        maSoBhxh: params.maSoBHXH,
        gtTheTuMoi: params.gtTheTuMoi,
        gtTheDenMoi: params.gtTheDenMoi,
        maDkbdMoi: params.maDKBDMoi,
        tenDkbdMoi: params.tenDKBDMoi,
        createdAt: now,
        updatedAt: now,
      });

      await this.checkHeinCardRepository.save(newCard);
    }
  }
} 