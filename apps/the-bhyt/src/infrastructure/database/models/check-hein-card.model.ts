import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CheckHeinCard } from '../../../domain/entities/check-hein-card.entity';
import { BaseModel } from './base.model';

@Entity('check_hein_cards')
export class CheckHeinCardModel extends BaseModel {

  @Column({ length: 100, unique: true })
  ma_lk: string;

  @Column({ length: 10 })
  ma_tra_cuu: string;

  @Column({ length: 10 })
  ma_kiem_tra: string;

  @Column({ length: 10 })
  ma_ket_qua: string;

  @Column({ type: 'text', nullable: true })
  ghi_chu: string;

  @Column({ length: 255, nullable: true })
  ma_the: string;

  @Column({ length: 255, nullable: true })
  ho_ten: string;

  @Column({ length: 100, nullable: true })
  ngay_sinh: string;

  @Column({ length: 255, nullable: true })
  dia_chi: string;

  @Column({ length: 255, nullable: true })
  ma_the_cu: string;

  @Column({ length: 255, nullable: true })
  ma_the_moi: string;

  @Column({ length: 255, nullable: true })
  ma_dkbd: string;

  @Column({ length: 255, nullable: true })
  cq_bhxh: string;

  @Column({ length: 255, nullable: true })
  gioi_tinh: string;

  @Column({ length: 255, nullable: true })
  gt_the_tu: string;

  @Column({ length: 255, nullable: true })
  gt_the_den: string;

  @Column({ length: 100, nullable: true })
  ma_kv: string;

  @Column({ length: 100, nullable: true })
  ngay_du5nam: string;

  @Column({ length: 255, nullable: true })
  maso_bhxh: string;

  @Column({ length: 100, nullable: true })
  gt_the_tumoi: string;

  @Column({ length: 100, nullable: true })
  gt_the_denmoi: string;

  @Column({ length: 100, nullable: true })
  ma_dkbd_moi: string;

  @Column({ length: 255, nullable: true })
  ten_dkbd_moi: string;

  // Mapper methods
  toEntity(): CheckHeinCard {
    return new CheckHeinCard({
      id: this.id,
      maLk: this.ma_lk,
      maTraCuu: this.ma_tra_cuu,
      maKiemTra: this.ma_kiem_tra,
      maKetQua: this.ma_ket_qua,
      ghiChu: this.ghi_chu,
      maThe: this.ma_the,
      hoTen: this.ho_ten,
      ngaySinh: this.ngay_sinh,
      diaChi: this.dia_chi,
      maTheCu: this.ma_the_cu,
      maTheMoi: this.ma_the_moi,
      maDkbd: this.ma_dkbd,
      cqBhxh: this.cq_bhxh,
      gioiTinh: this.gioi_tinh,
      gtTheTu: this.gt_the_tu,
      gtTheDen: this.gt_the_den,
      maKv: this.ma_kv,
      ngayDu5Nam: this.ngay_du5nam,
      maSoBhxh: this.maso_bhxh,
      gtTheTuMoi: this.gt_the_tumoi,
      gtTheDenMoi: this.gt_the_denmoi,
      maDkbdMoi: this.ma_dkbd_moi,
      tenDkbdMoi: this.ten_dkbd_moi,
      createdAt: this.created_at,
      updatedAt: this.updated_at,
      deletedAt: this.deleted_at,
      createdBy: this.created_by,
      updatedBy: this.updated_by,
      version: this.version,
    });
  }

  static fromEntity(entity: CheckHeinCard): CheckHeinCardModel {
    const model = new CheckHeinCardModel();
    const id = entity.getId();
    if (id) {
      model.id = id;
    }
    model.ma_lk = entity.getMaLk();
    model.ma_tra_cuu = entity.getMaTraCuu();
    model.ma_kiem_tra = entity.getMaKiemTra();
    model.ma_ket_qua = entity.getMaKetQua();
    model.ghi_chu = entity.getGhiChu() || '';
    model.ma_the = entity.getMaThe() || '';
    model.ho_ten = entity.getHoTen() || '';
    model.ngay_sinh = entity.getNgaySinh() || '';
    model.dia_chi = entity.getDiaChi() || '';
    model.ma_the_cu = entity.getMaTheCu() || '';
    model.ma_the_moi = entity.getMaTheMoi() || '';
    model.ma_dkbd = entity.getMaDkbd() || '';
    model.cq_bhxh = entity.getCqBhxh() || '';
    model.gioi_tinh = entity.getGioiTinh() || '';
    model.gt_the_tu = entity.getGtTheTu() || '';
    model.gt_the_den = entity.getGtTheDen() || '';
    model.ma_kv = entity.getMaKv() || '';
    model.ngay_du5nam = entity.getNgayDu5Nam() || '';
    model.maso_bhxh = entity.getMaSoBhxh() || '';
    model.gt_the_tumoi = entity.getGtTheTuMoi() || '';
    model.gt_the_denmoi = entity.getGtTheDenMoi() || '';
    model.ma_dkbd_moi = entity.getMaDkbdMoi() || '';
    model.ten_dkbd_moi = entity.getTenDkbdMoi() || '';
    model.created_at = entity.getCreatedAt();
    model.updated_at = entity.getUpdatedAt();
    model.deleted_at = entity.getDeletedAt();
    model.created_by = entity.getCreatedBy();
    model.updated_by = entity.getUpdatedBy();
    model.version = entity.getVersion();
    return model;
  }
} 