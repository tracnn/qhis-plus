import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('APPOINTMENTS')
export class Appointment extends BaseEntity {

  @Column({ name: 'APPOINTMENT_SLOT_ID' })
  @Index()
  appointmentSlotId: string;

  @Column({ name: 'PATIENT_ID' })
  @Index()
  patientId: string;

  @Column({ name: 'APPOINTMENT_STATUS' })
  appointmentStatus: string;

  @Column({ name: 'IS_ACTIVE', default: true })
  isActive: boolean;
}