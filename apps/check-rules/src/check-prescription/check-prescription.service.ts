import { Injectable } from "@nestjs/common";
import { CheckPrescriptionDto, DrugItemDto } from './dtos/check-prescription.dto';

@Injectable()
export class CheckPrescriptionService {
  async checkPrescription(checkPrescriptionDto: CheckPrescriptionDto): Promise<any> {
    // const facts = this.transformDtoToFacts(checkPrescriptionDto);
    // return facts;
    return checkPrescriptionDto;
  }

  // Phương thức chuyển DTO thành facts cho json-rules-engine
  private transformDtoToFacts(dto: CheckPrescriptionDto): Record<string, any> {
    const facts: Record<string, any> = {
      ma_lk: dto.ma_lk,
      stt: dto.stt,
      ma_bn: dto.ma_bn,
      ho_ten: dto.ho_ten,
      so_cccd: dto.so_cccd,
      ngay_sinh: dto.ngay_sinh,
      gioi_tinh: dto.gioi_tinh,
      nhom_mau: dto.nhom_mau,
      dia_chi: dto.dia_chi,
      ma_the_bhyt: dto.ma_the_bhyt,
      ma_dkbd: dto.ma_dkbd,
      ly_do_vv: dto.ly_do_vv,
      chan_doan_vao: dto.chan_doan_vao,
      ma_benh_chinh: dto.ma_benh_chinh,
      ma_benh_kt: dto.ma_benh_kt,
      ma_doituong_kcb: dto.ma_doituong_kcb,
      ngay_vao: dto.ngay_vao,
      ngay_ra: dto.ngay_ra,
      drug_list: dto.drug_list.map((drug: DrugItemDto) => drug.ma_thuoc),
    };
    return facts;
  }
}