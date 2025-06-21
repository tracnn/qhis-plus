import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { Specialty } from "../../specialty/entities/specialty.entity";
import { Title } from "../../title/entities/title.entity";

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

    // Quan hệ với bảng TITLE
    @ManyToOne(() => Title)
    @JoinColumn({ name: "TITLE_ID" })
    title: Title;
  
    // Quan hệ với bảng SPECIALTY
    @ManyToOne(() => Specialty)
    @JoinColumn({ name: "SPECIALTY_ID" })
    specialty: Specialty;
}