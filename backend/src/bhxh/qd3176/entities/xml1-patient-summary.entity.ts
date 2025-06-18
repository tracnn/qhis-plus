import { XmlSummaryType } from 'src/bhxh/enums/bhxh.enum';
import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';

@Entity('XML1_PATIENT_SUMMARY')
@Index(['maCskcb', 'maLk', 'stt'])
export class Xml1PatientSummary extends BaseEntity {
  @Column({ name: 'MA_LK', length: 100 })
  @Index()
  maLk: string;

  @Column({ name: 'STT', type: 'int' })
  stt: number;

  @Column({ name: 'MA_BN', length: 100 })
  @Index()
  maBn: string;

  @Column({ name: 'HO_TEN', length: 255 })
  hoTen: string;

  @Column({ name: 'SO_CCCD', length: 50, nullable: true })
  @Index()
  soCccd: string;

  @Column({ name: 'NGAY_SINH', length: 12 })
  ngaySinh: string;

  @Column({ name: 'GIOI_TINH', type: 'int' })
  gioiTinh: number;

  @Column({ name: 'NHOM_MAU', length: 5, nullable: true })
  nhomMau: string;

  @Column({ name: 'MA_QUOC_TICH', length: 3 })
  maQuocTich: string;

  @Column({ name: 'MA_DAN_TOC', length: 2 })
  maDanToc: string;

  @Column({ name: 'MA_NGHE_NGHIEP', length: 2 })
  maNgheNghiep: string;

  @Column({ name: 'DIA_CHI', type: 'varchar', length: 4000 })
  diaChi: string;

  @Column({ name: 'MA_TINH_CU_TRU', length: 3 })
  @Index()
  maTinhCuTru: string;

  @Column({ name: 'MA_HUYEN_CU_TRU', length: 3, nullable: true })
  @Index()
  maHuyenCuTru: string;

  @Column({ name: 'MA_XA_CU_TRU', length: 5, nullable: true })
  @Index()
  maXaCuTru: string;

  @Column({ name: 'DIEN_THOAI', length: 15, nullable: true })
  dienThoai: string;

  @Column({ name: 'MA_THE_BHYT', length: 255, nullable: true })
  @Index()
  maTheBhyt: string;

  @Column({ name: 'MA_DKBD', length: 255, nullable: true })
  @Index()
  maDkbd: string;

  @Column({ name: 'GT_THE_TU', length: 255, nullable: true })
  gtTheTu: string;

  @Column({ name: 'GT_THE_DEN', length: 255, nullable: true })
  gtTheDen: string;

  @Column({ name: 'NGAY_MIEN_CCT', length: 12, nullable: true })
  ngayMienCct: string;

  @Column({ name: 'LY_DO_VV', type: 'varchar', length: 4000, nullable: true })
  lyDoVv: string;

  @Column({ name: 'LY_DO_VNT', type: 'varchar', length: 4000, nullable: true })
  lyDoVnt: string;

  @Column({ name: 'MA_LY_DO_VNT', length: 5, nullable: true })
  maLyDoVnt: string;

  @Column({ name: 'CHAN_DOAN_VAO', type: 'varchar', length: 4000 })
  chanDoanVao: string;

  @Column({ name: 'CHAN_DOAN_RV', type: 'varchar', length: 4000 })
  chanDoanRv: string;

  @Column({ name: 'MA_BENH_CHINH', length: 7 })
  maBenhChinh: string;

  @Column({ name: 'MA_BENH_KT', length: 100, nullable: true })
  maBenhKt: string;

  @Column({ name: 'MA_BENH_YHCT', length: 150, nullable: true })
  maBenhYhct: string;

  @Column({ name: 'MA_PTTT_QT', length: 125, nullable: true })
  maPtttQt: string;

  @Column({ name: 'MA_DOI_TUONG_KCB', length: 4 })
  @Index()
  maDoiTuongKcb: string;

  @Column({ name: 'MA_NOI_DI', length: 5, nullable: true })
  maNoiDi: string;

  @Column({ name: 'MA_NOI_DEN', length: 5, nullable: true })
  maNoiDen: string;

  @Column({ name: 'MA_TAI_NAN', type: 'int', nullable: true })
  maTaiNan: number;

  @Column({ name: 'NGAY_VAO', length: 12 })
  @Index()
  ngayVao: string;

  @Column({ name: 'NGAY_VAO_NOI_TRU', length: 12, nullable: true })
  @Index()
  ngayVaoNoiTru: string;

  @Column({ name: 'NGAY_RA', length: 12 })
  @Index()
  ngayRa: string;

  @Column({ name: 'GIAY_CHUYEN_TUYEN', length: 50, nullable: true })
  giayChuyenTuyen: string;

  @Column({ name: 'SO_NGAY_DTRI', type: 'int' })
  soNgayDtri: number;

  @Column({ name: 'PP_DIEU_TRI', type: 'varchar', length: 4000, nullable: true })
  ppDieuTri: string;

  @Column({ name: 'KET_QUA_DTRI', type: 'int' })
  ketQuaDtri: number;

  @Column({ name: 'MA_LOAI_RV', type: 'int' })
  @Index()
  maLoaiRv: number;

  @Column({ name: 'GHI_CHU', type: 'varchar', length: 4000, nullable: true })
  ghiChu: string;

  @Column({ name: 'NGAY_TTOAN', length: 12, nullable: true })
  @Index()
  ngayTtoan: string;

  @Column({ name: 'T_THUOC', type: 'decimal', precision: 15, scale: 2 })
  tThuoc: number;

  @Column({ name: 'T_VTYT', type: 'decimal', precision: 15, scale: 2 })
  tVtyt: number;

  @Column({ name: 'T_TONGCHI_BV', type: 'decimal', precision: 15, scale: 2 })
  tTongchiBv: number;

  @Column({ name: 'T_TONGCHI_BH', type: 'decimal', precision: 15, scale: 2 })
  tTongchiBh: number;

  @Column({ name: 'T_BNTT', type: 'decimal', precision: 15, scale: 2 })
  tBntt: number;

  @Column({ name: 'T_BNCCT', type: 'decimal', precision: 15, scale: 2 })
  tBncct: number;

  @Column({ name: 'T_BHTT', type: 'decimal', precision: 15, scale: 2 })
  tBhtt: number;

  @Column({ name: 'T_NGUONKHAC', type: 'decimal', precision: 15, scale: 2 })
  tNguonkhac: number;

  @Column({ name: 'T_BHTT_GDV', type: 'decimal', precision: 15, scale: 2 })
  tBhttGdv: number;

  @Column({ name: 'NAM_QT', type: 'int' })
  @Index()
  namQt: number;

  @Column({ name: 'THANG_QT', type: 'int' })
  @Index()
  thangQt: number;

  @Column({ name: 'MA_LOAI_KCB', length: 2 })
  @Index()
  maLoaiKcb: string;

  @Column({ name: 'MA_KHOA', length: 50 })
  @Index()
  maKhoa: string;

  @Column({ name: 'MA_CSKCB', length: 5 })
  @Index()
  maCskcb: string;

  @Column({ name: 'MA_KHUVUC', length: 2, nullable: true })
  maKhuvuc: string;

  @Column({ name: 'CAN_NANG', length: 6, nullable: true })
  canNang: string;

  @Column({ name: 'CAN_NANG_CON', length: 100, nullable: true })
  canNangCon: string;

  @Column({ name: 'NAM_NAM_LIEN_TUC', length: 8, nullable: true })
  namNamLienTuc: string;

  @Column({ name: 'NGAY_TAI_KHAM', length: 50, nullable: true })
  ngayTaiKham: string;

  @Column({ name: 'MA_HSBA', length: 100 })
  maHsba: string;

  @Column({ name: 'MA_TTDV', length: 255 })
  maTtdv: string;

  @Column({ name: 'DU_PHONG', type: 'varchar', length: 4000, nullable: true })
  duPhong: string;

  @Column({ name: 'XML_SUMMARY_TYPE', enum: XmlSummaryType, default: XmlSummaryType.HOSO_DUNG })
  @Index()
  xmlSummaryType: XmlSummaryType;

  @Column({ name: 'IMPORT_SESSION_ID', nullable: true })
  @Index()
  importSessionId: string;
}