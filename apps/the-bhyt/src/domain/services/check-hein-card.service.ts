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
    ma_lk: string;
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
    
    // Kiểm tra xem đã tồn tại bản ghi với ma_lk chưa
    const existingCard = await this.checkHeinCardRepository.findByMaLk(params.ma_lk);
    
    if (existingCard) {
      // Nếu đã tồn tại thì update
      existingCard.ma_tracuu = params.maTracuu; // Giá trị cố định
      existingCard.ma_kiemtra = params.maKiemtra;
      existingCard.ma_ketqua = params.maKetqua;
      existingCard.ghi_chu = params.ghiChu;
      existingCard.ma_the = params.maThe;
      existingCard.ho_ten = params.hoTen;
      existingCard.ngay_sinh = params.ngaySinh;
      existingCard.dia_chi = params.diaChi;
      existingCard.ma_the_cu = params.maTheCu;
      existingCard.ma_the_moi = params.maTheMoi;
      existingCard.ma_dkbd = params.maCSKCB;
      existingCard.cq_bhxh = params.cqBHXH;
      existingCard.gioi_tinh = params.gioiTinh;
      existingCard.gt_the_tu = params.gtTheTu;
      existingCard.gt_the_den = params.gtTheDen;
      existingCard.ma_kv = params.maKV;
      existingCard.ngay_du5nam = params.ngayDu5Nam;
      existingCard.maso_bhxh = params.maSoBHXH;
      existingCard.gt_the_tumoi = params.gtTheTuMoi;
      existingCard.gt_the_denmoi = params.gtTheDenMoi;
      existingCard.ma_dkbd_moi = params.maDKBDMoi;
      existingCard.ten_dkbd_moi = params.tenDKBDMoi;
      existingCard.updated_at = now;

      await this.checkHeinCardRepository.save(existingCard);
    } else {
      // Nếu chưa tồn tại thì tạo mới
      const checkHeinCard = new CheckHeinCard();
      checkHeinCard.ma_lk = params.ma_lk;
      checkHeinCard.ma_tracuu = params.maTracuu;
      checkHeinCard.ma_kiemtra = params.maKiemtra;
      checkHeinCard.ma_ketqua = params.maKetqua;
      checkHeinCard.ghi_chu = params.ghiChu;
      checkHeinCard.ma_the = params.maThe;
      checkHeinCard.ho_ten = params.hoTen;
      checkHeinCard.ngay_sinh = params.ngaySinh;
      checkHeinCard.dia_chi = params.diaChi;
      checkHeinCard.ma_the_cu = params.maTheCu;
      checkHeinCard.ma_the_moi = params.maTheMoi;
      checkHeinCard.ma_dkbd = params.maCSKCB;
      checkHeinCard.cq_bhxh = params.cqBHXH;
      checkHeinCard.gioi_tinh = params.gioiTinh;
      checkHeinCard.gt_the_tu = params.gtTheTu;
      checkHeinCard.gt_the_den = params.gtTheDen;
      checkHeinCard.ma_kv = params.maKV;
      checkHeinCard.ngay_du5nam = params.ngayDu5Nam;
      checkHeinCard.maso_bhxh = params.maSoBHXH;
      checkHeinCard.gt_the_tumoi = params.gtTheTuMoi;
      checkHeinCard.gt_the_denmoi = params.gtTheDenMoi;
      checkHeinCard.ma_dkbd_moi = params.maDKBDMoi;
      checkHeinCard.ten_dkbd_moi = params.tenDKBDMoi;
      checkHeinCard.created_at = now;
      checkHeinCard.updated_at = now;

      await this.checkHeinCardRepository.save(checkHeinCard);
    }
  }
} 