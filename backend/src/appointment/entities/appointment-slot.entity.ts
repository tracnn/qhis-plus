import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('APPOINTMENT_SLOTS')
export class AppointmentSlot extends BaseEntity {
  @Column({ name: 'SLOT_DATE' })
  @Index()
  slotDate: Date;

  @Column({ name: 'START_TIME' })
  @Index()
  startTime: string;

  @Column({ name: 'END_TIME' })
  @Index()
  endTime: string;

  @Column({ name: 'CLINIC_ID' })
  @Index()
  clinicId: string;

  @Column({ name: 'CLINIC_CODE' })
  @Index()
  clinicCode: string;

  @Column({ name: 'DOCTOR_ID' })
  @Index()
  doctorId: string;

  @Column({ name: 'DOCTOR_CODE' })
  @Index()
  doctorCode: string;

  @Column({ name: 'SERVICE_CODE' })
  @Index()
  serviceCode: string;

  @Column({ name: 'SERVICE_PRICE' })
  servicePrice: number;

  @Column({ name: 'IS_ACTIVE', default: true })
  isActive: boolean;
}