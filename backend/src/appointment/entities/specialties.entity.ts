import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "src/common/base.entity";

@Entity('SPECIALTIES')
export class Specialties extends BaseEntity {
  @Column({ name: 'SPECIALTY_CODE' })
  @Index('SPECIALTY_CODE_INDEX', { unique: true })
  specialtyCode: string;

  @Column({ name: 'SPECIALTY_NAME' })
  specialtyName: string;

  @Column({ name: 'ORDER', nullable: true })
  order: number;

  @Column({ name: 'SPECIALTY_DESCRIPTION' })
  specialtyDescription: string;

  @Column({ name: 'IS_ACTIVE', default: true })
  isActive: boolean;
}