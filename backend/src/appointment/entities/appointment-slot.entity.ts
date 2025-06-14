import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { SLOT_TYPE } from "../enums/slot-type.enum";
import { SLOT_TIME } from "../enums/slot-time.enum";

@Entity('APPOINTMENT_SLOTS')
export class AppointmentSlot extends BaseEntity {
  @Column({ name: 'SLOT_DATE', type: 'varchar', length: 10 })
  @Index()
  slotDate: string;

  @Column({ name: 'SLOT_TIME', type: 'varchar' })
  @Index()
  slotTime: SLOT_TIME;

  @Column({ name: 'CLINIC_ID' })
  @Index()
  clinicId: number;

  @Column({ name: 'DOCTOR_ID' })
  @Index()
  doctorId: number;

  @Column({ name: 'SERVICE_CODE', nullable: true })
  @Index()
  serviceCode: string;

  @Column({ name: 'SERVICE_PRICE', nullable: true })
  servicePrice: number;

  @Column({ name: 'MAX_PATIENT', nullable: true })
  maxPatient: number;

  @Column({ name: 'SLOT_TYPE', nullable: true, type: 'varchar' })
  @Index()
  slotType: SLOT_TYPE;

  @Column({ name: 'IS_ACTIVE', default: true })
  isActive: boolean;
}