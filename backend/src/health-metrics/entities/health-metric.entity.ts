import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/base.entity";
import { FamilyMember } from "../../family-members/entities/family-member.entity";
import { User } from "../../user/entities/user.entity";

@Entity('HEALTH_METRICS')
export class HealthMetric extends BaseEntity{
    @Column({ name: 'USER_ID', type: 'uuid' })
    @Index()
    userId: string;

    @Column({ name: 'FAMILY_MEMBER_ID', type: 'uuid', nullable: true })
    @Index()
    familyMemberId: string;

    @Column({ name: 'PULSE', nullable: true })
    pulse: number;

    @Column({ name: 'SYSTOLIC', nullable: true })
    systolic: number;

    @Column({ name: 'DIASTOLIC', nullable: true })
    diastolic: number;

    @Column({ name: 'HEIGHT_CM', nullable: true })
    heightCm: number;

    @Column({ name: 'WEIGHT_KG', nullable: true })
    weightKg: number;

    @Column({ name: 'NOTE', nullable: true })
    note: string;

    @Column({ name: 'BMI', nullable: true })
    bmi: number;

    @Column({ name: 'BMI_STATUS', nullable: true })
    bmiStatus: string;

    @Column({ name: 'BLOOD_PRESSURE_STATUS', nullable: true })
    bloodPressureStatus: string;

    @Column({ name: 'BLOOD_PRESSURE_STATUS_NUMBER', nullable: true })
    bloodPressureStatusNumber: number;

    @Column({ name: 'HBA1C', nullable: true })
    hbA1c: number;

    @Column({ name: 'GLUCOSE', nullable: true })
    glucose: number;

    @Column({ name: 'METRIC_DATE' })
    metricDate: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'USER_ID' })
    user: User;

    @ManyToOne(() => FamilyMember, { nullable: true })
    @JoinColumn({ name: 'FAMILY_MEMBER_ID' })
    familyMember: FamilyMember;
}