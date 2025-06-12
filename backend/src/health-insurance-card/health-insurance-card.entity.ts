import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity('HEALTH_INSURANCE_CARDS')
export class HealthInsuranceCard extends BaseEntity {
    @Column({ name: 'MA_LK' })
    maLk: string;

    @Column({ name: 'MA_KIEM_TRA' })
    maKiemTra: string;

    @Column({ name: 'MA_KET_QUA' })
    maKetQua: string;

    @Column({ name: 'GHI_CHU' })
    ghiChu: string;

    @Column({ name: 'MA_THE' })
    maThe: string;

    @Column({ name: 'HO_TEN' })
    hoTen: string;

    @Column({ name: 'NGAY_SINH' })
    ngaySinh: string;

    @Column({ name: 'DIA_CHI' })
    diaChi: string;

    @Column({ name: 'MA_THE_CU' })
    maTheCu: string;

    @Column({ name: 'MA_THE_MOI' })
    maTheMoi: string;

    @Column({ name: 'MA_DKBD' })
    maDKBD: string;

    @Column({ name: 'CQ_BHXH' })
    cqBHXH: string;

    @Column({ name: 'GIOI_TINH' })
    gioiTinh: string;

    @Column({ name: 'GT_THE_TU' })
    gtTheTu: string;

    @Column({ name: 'GT_THE_DEN' })
    gtTheDen: string;

    @Column({ name: 'MA_KV' })
    maKV: string;

    @Column({ name: 'NGAY_DU_5_NAM' })
    ngayDu5Nam: string;

    @Column({ name: 'MASO_BHXH' })
    masoBHXH: string;

    @Column({ name: 'GT_THE_TU_MOI' })
    gtTheTuMoi: string;

    @Column({ name: 'GT_THE_DEN_MOI' })
    gtTheDenMoi: string;

    @Column({ name: 'MA_DKBD_MOI' })
    maDKBDMoi: string;

    @Column({ name: 'TEN_DKBD_MOI' })
    tenDKBDMoi: string;
} 