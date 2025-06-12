import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseHisEntity } from '../../../common/base.his.entity';
import { District } from './district.entity';

@Entity({ name: 'SDA_COMMUNE' })
export class Commune extends BaseHisEntity {
    @Column({ name: 'COMMUNE_CODE' })
    communeCode: string;

    @Column({ name: 'COMMUNE_NAME' })
    communeName: string;

    @Column({ name: 'INITIAL_NAME' })
    initialName: string;

    @Column({ name: 'DISTRICT_ID' })
    districtId: number;

    @Column({ name: 'SEARCH_CODE' })
    searchCode: string;

    @ManyToOne(() => District, (district) => district.communes)
    @JoinColumn({ name: 'DISTRICT_ID' })
    district: District;
} 