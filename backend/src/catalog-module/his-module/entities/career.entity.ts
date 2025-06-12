import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseHisEntity } from '../../../common/base.his.entity';
@Entity({ name: 'HIS_CAREER' })
export class Career extends BaseHisEntity {
    @Column({ name: 'CAREER_CODE' })
    careerCode: string;

    @Column({ name: 'CAREER_NAME' })
    careerName: string;
} 