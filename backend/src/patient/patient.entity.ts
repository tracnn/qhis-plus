import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity({ name: 'patients' })
export class Patient extends BaseEntity {
    @Column({ name: 'full_name' })
    fullName: string;

    @Column({ name: 'date_of_birth', type: 'date' })
    dateOfBirth: Date;

    @Column({ name: 'gender' })
    gender: string;

    @Column({ name: 'address' })
    address: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;
} 