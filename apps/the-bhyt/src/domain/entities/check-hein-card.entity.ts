export class CheckHeinCard {
  private readonly id?: number;
  private readonly maLk: string;
  private readonly maTraCuu: string;
  private readonly maKiemTra: string;
  private readonly maKetQua: string;
  private readonly ghiChu?: string;
  private readonly maThe?: string;
  private readonly hoTen?: string;
  private readonly ngaySinh?: string;
  private readonly diaChi?: string;
  private readonly maTheCu?: string;
  private readonly maTheMoi?: string;
  private readonly maDkbd?: string;
  private readonly cqBhxh?: string;
  private readonly gioiTinh?: string;
  private readonly gtTheTu?: string;
  private readonly gtTheDen?: string;
  private readonly maKv?: string;
  private readonly ngayDu5Nam?: string;
  private readonly maSoBhxh?: string;
  private readonly gtTheTuMoi?: string;
  private readonly gtTheDenMoi?: string;
  private readonly maDkbdMoi?: string;
  private readonly tenDkbdMoi?: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(params: {
    id?: number;
    maLk: string;
    maTraCuu: string;
    maKiemTra: string;
    maKetQua: string;
    ghiChu?: string;
    maThe?: string;
    hoTen?: string;
    ngaySinh?: string;
    diaChi?: string;
    maTheCu?: string;
    maTheMoi?: string;
    maDkbd?: string;
    cqBhxh?: string;
    gioiTinh?: string;
    gtTheTu?: string;
    gtTheDen?: string;
    maKv?: string;
    ngayDu5Nam?: string;
    maSoBhxh?: string;
    gtTheTuMoi?: string;
    gtTheDenMoi?: string;
    maDkbdMoi?: string;
    tenDkbdMoi?: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = params.id;
    this.maLk = params.maLk;
    this.maTraCuu = params.maTraCuu;
    this.maKiemTra = params.maKiemTra;
    this.maKetQua = params.maKetQua;
    this.ghiChu = params.ghiChu;
    this.maThe = params.maThe;
    this.hoTen = params.hoTen;
    this.ngaySinh = params.ngaySinh;
    this.diaChi = params.diaChi;
    this.maTheCu = params.maTheCu;
    this.maTheMoi = params.maTheMoi;
    this.maDkbd = params.maDkbd;
    this.cqBhxh = params.cqBhxh;
    this.gioiTinh = params.gioiTinh;
    this.gtTheTu = params.gtTheTu;
    this.gtTheDen = params.gtTheDen;
    this.maKv = params.maKv;
    this.ngayDu5Nam = params.ngayDu5Nam;
    this.maSoBhxh = params.maSoBhxh;
    this.gtTheTuMoi = params.gtTheTuMoi;
    this.gtTheDenMoi = params.gtTheDenMoi;
    this.maDkbdMoi = params.maDkbdMoi;
    this.tenDkbdMoi = params.tenDkbdMoi;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  // Business methods
  public isValid(): boolean {
    return Boolean(this.maLk && this.maTraCuu && this.maKiemTra && this.maKetQua);
  }

  // Getters
  public getId(): number | undefined {
    return this.id;
  }

  public getMaLk(): string {
    return this.maLk;
  }

  public getMaTraCuu(): string {
    return this.maTraCuu;
  }

  public getMaKiemTra(): string {
    return this.maKiemTra;
  }

  public getMaKetQua(): string {
    return this.maKetQua;
  }

  public getGhiChu(): string | undefined {
    return this.ghiChu;
  }

  public getMaThe(): string | undefined {
    return this.maThe;
  }

  public getHoTen(): string | undefined {
    return this.hoTen;
  }

  public getNgaySinh(): string | undefined {
    return this.ngaySinh;
  }

  public getDiaChi(): string | undefined {
    return this.diaChi;
  }

  public getMaTheCu(): string | undefined {
    return this.maTheCu;
  }

  public getMaTheMoi(): string | undefined {
    return this.maTheMoi;
  }

  public getMaDkbd(): string | undefined {
    return this.maDkbd;
  }

  public getCqBhxh(): string | undefined {
    return this.cqBhxh;
  }

  public getGioiTinh(): string | undefined {
    return this.gioiTinh;
  }

  public getGtTheTu(): string | undefined {
    return this.gtTheTu;
  }

  public getGtTheDen(): string | undefined {
    return this.gtTheDen;
  }

  public getMaKv(): string | undefined {
    return this.maKv;
  }

  public getNgayDu5Nam(): string | undefined {
    return this.ngayDu5Nam;
  }

  public getMaSoBhxh(): string | undefined {
    return this.maSoBhxh;
  }

  public getGtTheTuMoi(): string | undefined {
    return this.gtTheTuMoi;
  }

  public getGtTheDenMoi(): string | undefined {
    return this.gtTheDenMoi;
  }

  public getMaDkbdMoi(): string | undefined {
    return this.maDkbdMoi;
  }

  public getTenDkbdMoi(): string | undefined {
    return this.tenDkbdMoi;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
} 