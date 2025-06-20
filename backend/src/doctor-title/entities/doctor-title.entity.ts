import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('DOCTOR_TITLES')
export class DoctorTitle extends BaseEntity {
  @Column({ name: 'DOCTOR_ID' })
  @Index()
  doctorId: number;

  @Column({ name: "TITLE_ID" })
  @Index()
  titleId: string;

  @Column({ name: "SPECIALTY_ID" })
  @Index()
  specialtyId: string;

  @Column({ name: "AVARTAR_URL", nullable: true })
  avartarUrl: string;

  @Column({ name: "IS_ACTIVE", default: true })
  isActive: boolean;
}