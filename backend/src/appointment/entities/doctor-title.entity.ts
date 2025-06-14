import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('DOCTOR_TITLES')
export class DoctorTitle extends BaseEntity {
  @Column({ name: 'DOCTOR_ID' })
  @Index()
  doctorId: string;

  @Column({ name: "DOCTOR_CODE" })
  @Index()
  doctorCode: string;

  @Column({ name: "TITLE_ID" })
  @Index()
  titleId: string;

  @Column({ name: "TITLE_CODE" })
  @Index()
  titleCode: string;

  @Column({ name: "IS_ACTIVE", default: true })
  isActive: boolean;
}