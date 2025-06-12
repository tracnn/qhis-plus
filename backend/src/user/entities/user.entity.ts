import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/base.entity';
import { FamilyMember } from '../../family-members/entities/family-member.entity';

@Entity('USERS')
export class User extends BaseEntity {
    
    @Index('IDX_USERS_USERNAME', { unique: true })
    @Column({ name: 'USERNAME' })
    username: string;
    
    @Index('IDX_USERS_EMAIL', { unique: true })
    @Column({ name: 'EMAIL', nullable: true })
    email: string;

    @Exclude()
    @Column({ name: 'PASSWORD' })
    password: string;

    @Column({ name: 'IS_LOCKED', default: false })
    isLocked: boolean;

    @Column({ name: 'LAST_LOGIN_AT', nullable: true })
    lastLoginAt: Date;

    @Column({ name: 'LAST_LOGIN_IP', nullable: true })
    lastLoginIp: string;

    @Column({ name: 'LAST_LOGIN_USER_AGENT', nullable: true })
    lastLoginUserAgent: string;

    @Column({ name: 'FULL_NAME', nullable: true })
    fullName: string;

    @Column({ name: 'BIRTH_DATE', nullable: true })
    birthDate: string;

    @Column({ name: 'GENDER_CODE', nullable: true })
    genderCode: number;

    @Column({ name: 'ADDRESS', nullable: true })
    address: string;

    @Column({ name: 'PROVINCE_ID', nullable: true })
    provinceId: number;

    @Column({ name: 'DISTRICT_ID', nullable: true })
    districtId: number;

    @Column({ name: 'COMMUNE_ID', nullable: true })
    communeId: number;

    @Column({ name: 'HEIN_CARD_NUMBER', nullable: true })
    heinCardNumber: string;

    @Index('IDX_USERS_INSURANCE', { unique: true })
    @Column({ name: 'INSURANCE_NUMBER', length: 10, nullable: true })
    insuranceNumber: string;

    @Index('IDX_USERS_IDENTITY_ID', { unique: true })
    @Column({ name: 'IDENTITY_NUMBER', length: 12, nullable: true })
    identityNumber: string;

    @Column({ name: 'PHONE_NUMBER', length: 10, nullable: true })
    phoneNumber: string;

    @Column({ name: 'CAREER_ID', nullable: true })
    careerId: number;

    @Column({ name: 'ETHNIC_ID', nullable: true })
    ethnicId: number;

    @Column({ name: 'NATIONAL_ID', nullable: true })
    nationalId: number;

    @Column({ name: 'IS_ACTIVE', type: 'number', default: 1 })
    isActive: number;

    @OneToMany(() => FamilyMember, familyMember => familyMember.userId)
    familyMembers: FamilyMember[];
} 