import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
  
  @Entity('XML2_DRUG_DETAIL')
  export class Xml2DrugDetail extends BaseEntity {
    @Column({ name: 'XML1_ID' })
    @Index()
    xml1Id: string;

    @Column({ name: 'MA_LK', length: 100 })
    @Index()
    maLk: string;
  
    @Column({ name: 'STT', type: 'int' })
    stt: number;
  
    @Column({ name: 'MA_THUOC', length: 255 })
    @Index()
    maThuoc: string;
  
    @Column({ name: 'MA_PP_CHEBIEN', length: 255, nullable: true })
    @Index()
    maPpCheBien: string;
  
    @Column({ name: 'MA_CSKCB_THUOC', length: 10, nullable: true })
    @Index()
    maCskcbThuoc: string;
  
    @Column({ name: 'MA_NHOM', type: 'int' })
    @Index()
    maNhom: number;
  
    @Column({ name: 'TEN_THUOC', length: 1024 })
    tenThuoc: string;
  
    @Column({ name: 'DON_VI_TINH', length: 50 })
    donViTinh: string;
  
    @Column({ name: 'HAM_LUONG', length: 1024 })
    hamLuong: string;
  
    @Column({ name: 'DUONG_DUNG', length: 4 })
    @Index()
    duongDung: string;
  
    @Column({ name: 'DANG_BAO_CHE', length: 1024 })
    dangBaoChe: string;
  
    @Column({ name: 'LIEU_DUNG', length: 1024 })
    lieuDung: string;
  
    @Column({ name: 'CACH_DUNG', length: 1024 })
    cachDung: string;
  
    @Column({ name: 'SO_DANG_KY', length: 255 })
    soDangKy: string;
  
    @Column({ name: 'TT_THAU', length: 255 })
    @Index()
    ttThau: string;
  
    @Column({ name: 'PHAM_VI', type: 'int' })
    phamVi: number;
  
    @Column({ name: 'TYLE_TT_BH', type: 'int' })
    tyleTtBh: number;
  
    @Column({ name: 'SO_LUONG', type: 'decimal', precision: 15, scale: 3 })
    soLuong: number;
  
    @Column({ name: 'DON_GIA', type: 'decimal', precision: 15, scale: 3 })
    donGia: number;
  
    @Column({ name: 'THANH_TIEN_BV', type: 'decimal', precision: 15, scale: 2 })
    thanhTienBv: number;
  
    @Column({ name: 'THANH_TIEN_BH', type: 'decimal', precision: 15, scale: 2 })
    thanhTienBh: number;
  
    @Column({ name: 'T_NGUONKHAC_NSNN', type: 'decimal', precision: 15, scale: 2 })
    tNguonKhacNsnn: number;
  
    @Column({ name: 'T_NGUONKHAC_VTNN', type: 'decimal', precision: 15, scale: 2 })
    tNguonKhacVtnn: number;
  
    @Column({ name: 'T_NGUONKHAC_VTTN', type: 'decimal', precision: 15, scale: 2 })
    tNguonKhacVttn: number;
  
    @Column({ name: 'T_NGUONKHAC_CL', type: 'decimal', precision: 15, scale: 2 })
    tNguonKhacCl: number;
  
    @Column({ name: 'T_NGUONKHAC', type: 'decimal', precision: 15, scale: 2 })
    tNguonKhac: number;
  
    @Column({ name: 'MUC_HUONG', type: 'int' })
    mucHuong: number;
  
    @Column({ name: 'T_BNTT', type: 'decimal', precision: 15, scale: 2 })
    tBntt: number;
  
    @Column({ name: 'T_BNCCT', type: 'decimal', precision: 15, scale: 2 })
    tBncct: number;
  
    @Column({ name: 'T_BHTT', type: 'decimal', precision: 15, scale: 2 })
    tBhtt: number;
  
    @Column({ name: 'MA_KHOA', length: 50 })
    @Index()
    maKhoa: string;
  
    @Column({ name: 'MA_BAC_SI', length: 255 })
    @Index()
    maBacSi: string;
  
    @Column({ name: 'MA_DICH_VU', length: 255 })
    @Index()
    maDichVu: string;
  
    @Column({ name: 'NGAY_YL', length: 12 })
    @Index()
    ngayYl: string;
  
    @Column({ name: 'NGAY_TH_YL', length: 12, nullable: true })
    @Index()
    ngayThYl: string;
  
    @Column({ name: 'MA_PTTT', type: 'int' })
    @Index()
    maPttt: number;
  
    @Column({ name: 'NGUON_CTRA', type: 'int' })
    nguonCtra: number;
  
    @Column({ name: 'VET_THUONG_TP', type: 'int', nullable: true })
    vetThuongTp: number;
  
    @Column({ name: 'DU_PHONG', type: 'varchar', length: 4000, nullable: true })
    duPhong: string;

    @Column({ name: 'IMPORT_SESSION_ID', nullable: true })
    @Index()
    importSessionId: string;
  }