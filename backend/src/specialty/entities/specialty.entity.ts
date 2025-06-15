import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('SPECIALTIES')
export class Specialty extends BaseEntity {
  @Column({ name: 'SPECIALTY_CODE' })
  @Index( { unique: true })
  specialtyCode: string;

  @Column({ name: 'SPECIALTY_NAME' })
  specialtyName: string;

  @Column({ name: 'ORDER', nullable: true })
  order: number;

  @Column({ name: 'SPECIALTY_DESCRIPTION', length: 2000 })
  specialtyDescription: string;

  @Column({ name: 'IS_ACTIVE', default: true })
  isActive: boolean;
}