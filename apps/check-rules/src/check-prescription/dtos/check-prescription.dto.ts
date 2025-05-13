import {
    IsString,
    IsOptional,
    IsDateString,
    IsArray,
    IsNumber,
    ValidateNested,
    IsObject,
    IsIn,
    IsInt,
    IsPositive,
    IsISO8601,
    IsNotEmpty,
    isNotEmpty,
    Matches,
    max,
    Max,
    Min
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class DrugItemDto {
    @IsString()
    @IsNotEmpty()
    ma_lk: string;
  
    @IsInt()
    stt: number;
  
    @IsString()
    @IsNotEmpty()
    ma_thuoc: string;
  
    @IsOptional()
    @IsString()
    ma_pp_chebien?: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^(\d{5}|\s*)$/)
    ma_cskcb_thuoc?: string;
  
    @IsString()
    @IsNotEmpty()
    ma_nhom: string;
  
    @IsString()
    @IsNotEmpty()
    ten_thuoc: string;
  
    @IsString()
    @IsNotEmpty()
    don_vi_tinh: string;

    @IsOptional()
    @IsString()
    ham_luong: string;
  
    @IsString()
    @IsNotEmpty()
    duong_dung: string;
  
    @IsOptional()
    @IsString()
    dang_bao_che?: string;
  
    @IsString()
    @IsNotEmpty()
    lieu_dung: string;
  
    @IsString()
    @IsNotEmpty()
    cach_dung: string;
  
    @IsOptional()
    @IsString()
    so_dang_ky: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^.+\.G\d{1,2}\.N\d{1,2}\.\d{4}$/)
    tt_thau: string;
  
    @IsOptional()
    @IsString()
    pham_vi?: string;
  
    @IsOptional()
    @IsString()
    tyle_tt_bh?: string;
  
    @IsNumber()
    @IsNotEmpty()
    so_luong: number;

    @IsNumber()
    @IsNotEmpty()
    don_gia: number;
  
    @IsOptional()
    @IsNumber()
    thanh_tien_bv: number;
  
    @IsOptional()
    @IsNumber()
    thanh_tien_bh: number;
  
    @IsOptional()
    @IsNumber()
    t_nguonkhac: number;
  
    @IsOptional()
    @IsNumber()
    muc_huong: number;
  
    @IsOptional()
    @IsNumber()
    t_bhtt: number;
  
    @IsOptional()
    @IsNumber()
    t_bncct: number;
  
    @IsOptional()
    @IsNumber()
    t_bntt: number;
  
    @IsString()
    @IsNotEmpty()
    ma_khoa: string;
  
    @IsString()
    @IsNotEmpty()
    ma_bac_si: string;
  
    @IsOptional()
    @IsString()
    ma_dich_vu?: string;
  
    @IsString()
    @IsNotEmpty()
    @Matches(/^(\d{12}|\s*)$/)
    ngay_yl: string;
  
    @IsOptional()
    @IsString()
    ngay_th_yl?: string;
  
    @IsOptional()
    @IsString()
    ma_pttt?: string;
  
    @IsOptional()
    @IsString()
    nguon_ctra?: string;
  
    @IsOptional()
    @IsString()
    vet_thuong_tp?: string;

    @IsNumber()
    t_nguonkhac_nsnn: number;

    @IsNumber()
    t_nguonkhac_vtnn: number;

    @IsNumber()
    t_nguonkhac_vttn: number;

    @IsNumber()
    t_nguonkhac_cl: number;
  }
  
  export class CheckPrescriptionDto {
    @IsString()
    @IsNotEmpty()
    ma_lk: string;
  
    @IsNumber()
    @IsNotEmpty()
    stt: number;
  
    @IsString()
    @IsNotEmpty()
    ma_bn: string;
  
    @IsString()
    @IsNotEmpty()
    ho_ten: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^\d{12}$/)
    so_cccd?: string;
  
    @IsString()
    @Matches(/^\d{8}$/)
    ngay_sinh: string;
  
    @IsIn([1, 2, 3])
    gioi_tinh: number;
  
    @IsOptional()
    @IsString()
    nhom_mau?: string;
  
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{3}$/)
    ma_quoctich?: string;

    @IsOptional()
    @IsString()
    matinh_cu_tru?: string;
  
    @IsOptional()
    @IsString()
    mahuyen_cu_tru?: string;

    @IsOptional()
    @IsString()
    maxa_cu_tru?: string;

    @IsOptional()
    @IsString()
    ma_pttt_qt?: string;

    @IsOptional()
    @IsString()
    ma_tai_nan?: string;

    @IsOptional()
    @IsString()
    ngay_vao_noi_tru?: string;

    @IsOptional()
    @IsString()
    so_ngay_dtri?: string;

    @IsOptional()
    @IsString()
    pp_dieu_tri?: string;

    @IsOptional()
    @IsNumber()
    t_bhtt_gdv?: number;

    @IsOptional()
    @IsString()
    ma_khuvuc?: string;

    @IsOptional()
    @IsNumber()
    can_nang_con?: number;

    @IsOptional()
    @IsString()
    @Matches(/^(\d{8}|\s*)$/)
    nam_nam_lien_tuc?: string;

    @IsOptional()
    @IsString()
    @Matches(/^(\d{8}|\s*)$/)
    ngay_tai_kham?: string;

    @IsOptional()
    @IsString()
    ma_hsba?: string;

    @IsOptional()
    @IsString()
    ma_ttdv?: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{2}$/)
    ma_dantoc?: string;
  
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{5}$/)
    ma_nghe_nghiep?: string;
  
    @IsString()
    @IsNotEmpty()
    dia_chi: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^(\d{10}|\s*)$/)
    dien_thoai?: string | null;
  
    @IsOptional()
    @IsString()
    @Matches(/^([A-Z]{2}\d{13}|\s*)$/)
    ma_the_bhyt?: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^(\d{5}|\s*)$/)
    ma_dkbd?: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^(\d{8}|\s*)$/)
    gt_the_tu?: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^(\d{8}|\s*)$/)
    gt_the_den?: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^(\d{8}|\s*)$/)
    ngay_mien_cct?: string;
  
    @IsString()
    ly_do_vv: string;
  
    @IsOptional()
    @IsString()
    ly_do_vnt?: string;
  
    @IsOptional()
    @IsString()
    ma_ly_do_vnt?: string;
  
    @IsString()
    chan_doan_vao: string;
  
    @IsOptional()
    @IsString()
    chan_doan_rv?: string;
  
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Z]\d{2}(\.\d{1,4})?$/)
    ma_benh_chinh: string;
  
    @IsArray()
    @IsString({ each: true })
    @Matches(/^[A-Z]\d{2}(\.\d{1,4})?$/, { each: true })
    ma_benh_kt: string[];
  
    @IsOptional()
    @IsString()
    ma_benh_yhct?: string;
  
    @IsString()
    @IsNotEmpty()
    ma_doituong_kcb: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^(\d{5}|\s*)$/)
    ma_noi_di?: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^(\d{5}|\s*)$/)
    ma_noi_den?: string;
  
    @IsString()
    @IsNotEmpty()
    @Matches(/^(\d{12})$/)
    ngay_vao: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^(\d{12}|\s*)$/)
    ngay_ra?: string;
  
    @IsOptional()
    @IsString()
    giay_chuyen_tuyen?: string;
  
    @IsOptional()
    @IsString()
    ket_qua_dtri?: string;
  
    @IsOptional()
    @IsString()
    ma_loai_rv?: string;
  
    @IsOptional()
    @IsString()
    ghi_chu?: string;
  
    @IsOptional()
    @IsString()
    @Matches(/^(\d{12}|\s*)$/)
    ngay_ttoan?: string;
  
    @IsNumber()
    t_thuoc: number;
  
    @IsNumber()
    t_vtyt: number;
  
    @IsNumber()
    t_tongchi_bv: number;
  
    @IsNumber()
    t_tongchi_bh: number;
  
    @IsNumber()
    t_bntt: number;
  
    @IsNumber()
    t_bncct: number;
  
    @IsNumber()
    t_bhtt: number;
  
    @IsNumber()
    t_nguonkhac: number;
  
    @IsNumber()
    nam_qt: number;
  
    @IsNumber()
    thang_qt: number;
  
    @IsString()
    ma_loai_kcb: string;
  
    @IsString()
    @IsNotEmpty()
    ma_khoa: string;
  
    @IsString()
    @IsNotEmpty()
    @Matches(/^(\d{5})$/)
    ma_cskcb: string;
  
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(200)
    can_nang: number;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DrugItemDto)
    drug_list: DrugItemDto[];
  }