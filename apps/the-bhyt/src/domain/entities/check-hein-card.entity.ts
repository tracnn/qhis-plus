import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity('check_hein_cards')
export class CheckHeinCard {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ length: 100, unique: true })
  ma_lk: string;

  @Column({ length: 10 })
  ma_tracuu: string;

  @Column({ length: 10 })
  ma_kiemtra: string;

  @Column({ length: 10 })
  ma_ketqua: string;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 