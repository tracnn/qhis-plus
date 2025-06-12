import { Entity, Column,  ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseHisEntity } from '../../../common/base.his.entity';
import { Province } from './province.entity';
import { Commune } from './commune.entity';

@Entity({ name: 'SDA_DISTRICT' })
export class District extends BaseHisEntity{
    @Column({ name: 'DISTRICT_CODE' })
    districtCode: string;

    @Column({ name: 'DISTRICT_NAME' })
    districtName: string;

    @Column({ name: 'INITIAL_NAME' })
    initialName: string;

    @Column({ name: 'PROVINCE_ID' })
    provinceId: number;

    @Column({ name: 'SEARCH_CODE' })
    searchCode: string;

    @ManyToOne(() => Province, (province) => province.districts)
    @JoinColumn({ name: 'PROVINCE_ID' })
    province: Province;

    @OneToMany(() => Commune, (commune) => commune.districtId)
    communes: Commune[];
} 