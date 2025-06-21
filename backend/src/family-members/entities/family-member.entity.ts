import { ManyToOne, Column, Index, Entity, JoinColumn } from "typeorm";

import { BaseEntity } from "../../common/base.entity";
import { User } from "../../user/entities/user.entity";

@Entity('FAMILY_MEMBERS')
export class FamilyMember extends BaseEntity {
    @Column({ type: 'uuid', name: 'USER_ID' })
    @Index({ unique: false })
    userId: string;

    @Column({ name: 'FULL_NAME', type: 'varchar', length: 255 })
    fullName: string;

    @Column({ name: 'BIRTH_DATE', length: 10 })
    birthDate: string;

    @Column({ name: 'GENDER_CODE' })
    genderCode: number;

    @Column({ name: 'IDENTITY_NUMBER', type: 'varchar', length: 100 })
    @Index({ unique: false })
    identityNumber: string;

    @Column({ name: 'PHONE_NUMBER', type: 'varchar', length: 255, nullable: true })
    phoneNumber: string;

    @Column({ name: 'EMAIL', type: 'varchar', length: 255, nullable: true })
    email: string;

    @Column({ name: 'RELATIONSHIP_ID' })
    relationshipId: number;

    @Column({ name: 'PROVINCE_ID', nullable: true })
    provinceId: number;

    @Column({ name: 'DISTRICT_ID', nullable: true })
    districtId: number;

    @Column({ name: 'COMMUNE_ID', nullable: true })
    communeId: number;

    @Column({ name: 'HEIN_CARD_NUMBER', nullable: true })
    heinCardNumber: string;

    @Index({ unique: false })
    @Column({ name: 'INSURANCE_NUMBER', length: 10, nullable: true })
    insuranceNumber: string;

    @Column({ name: 'ADDRESS', type: 'varchar', length: 255, nullable: true })
    address: string;

    @Column({ name: 'CAREER_ID', nullable: true })
    careerId: number;

    @Column({ name: 'ETHNIC_ID', nullable: true })
    ethnicId: number;

    @Column({ name: 'NATIONAL_ID', nullable: true })
    nationalId: number;

    @Column({ name: 'IS_ACTIVE', type: 'number', default: 1 })
    isActive: number;
  
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'USER_ID' })
    user: User;
}
