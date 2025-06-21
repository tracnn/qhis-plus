import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('CLINIC_SPECIALTIES')
export class ClinicSpecialty extends BaseEntity {
  @Column({ name: 'CLINIC_ID' })
  @Index()
  clinicId: number;

  @Column({ type: 'uuid', name: 'SPECIALTY_ID' })
  @Index()
  specialtyId: string;

  @Column({ name: 'IS_ACTIVE', default: true })
  isActive: boolean;
}