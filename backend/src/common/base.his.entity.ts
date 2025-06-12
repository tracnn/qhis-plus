import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    BaseEntity as TypeOrmBaseEntity,
    VersionColumn,
} from 'typeorm';
  
export abstract class BaseHisEntity extends TypeOrmBaseEntity {
    @PrimaryGeneratedColumn({ name: 'ID' })
    id: number;

    @Column({ name: 'CREATE_TIME' })
    createTime: number;

    @Column({ name: 'MODIFY_TIME' })
    modifyTime: number;

    @Column({ name: 'CREATOR' })
    creator: string;

    @Column({ name: 'MODIFIER' })
    modifier: string;

    @Column({ name: 'APP_CREATOR' })
    appCreator: string;

    @Column({ name: 'IS_ACTIVE' })
    isActive: number;

    @Column({ name: 'IS_DELETE' })
    isDelete: number;

    @Column({ name: 'GROUP_CODE' })
    groupCode: string;
}
  