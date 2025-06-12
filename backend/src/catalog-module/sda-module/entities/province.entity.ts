import { Entity, Column, OneToMany } from 'typeorm';
import { BaseHisEntity } from '../../../common/base.his.entity';
import { District } from './district.entity';

@Entity({ name: 'SDA_PROVINCE' })
export class Province extends BaseHisEntity {
    @Column({ name: 'PROVINCE_CODE' })
    provinceCode: string;

    @Column({ name: 'PROVINCE_NAME' })
    provinceName: string;

    @Column({ name: 'NATIONAL_ID' })
    nationalId: number;

    @Column({ name: 'SEARCH_CODE' })
    searchCode: string;

    @OneToMany(() => District, (district) => district.provinceId)
    districts: District[];
} 