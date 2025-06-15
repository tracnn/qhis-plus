import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { APPOINTMENT_STATUS } from "../enums/appointment-status.enum";
import { SOURCE_TYPE } from "../enums/source-type.enum";

@Entity('APPOINTMENTS')
export class Appointment extends BaseEntity {

  @Column({ name: 'APPOINTMENT_CODE', unique: true })
  appointmentCode: string;

  @Column({ name: 'APPOINTMENT_SLOT_ID' })
  @Index()
  appointmentSlotId: string;

  @Column({ name: 'PATIENT_ID' })
  @Index()
  patientId: string;

  @Column({ name: 'APPOINTMENT_STATUS', default: APPOINTMENT_STATUS.PENDING })
  appointmentStatus: APPOINTMENT_STATUS;

  @Column({ name: 'APPOINTMENT_NOTE' })
  appointmentNote: string;

  @Column({ name: 'SOURCE_TYPE', default: SOURCE_TYPE.APP_MOBILE })
  sourceType: SOURCE_TYPE;

  @Column({ name: 'CONFIRM_BY', nullable: true })
  @Index()
  confirmBy: string;

  @Column({ name: 'USER_ID' })
  @Index()
  userId: string;

  @Column({ name: 'IS_ACTIVE', default: true })
  isActive: boolean;
}