import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BaseEntity as TypeOrmBaseEntity,
  VersionColumn,
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;

  @Column({ name: 'CREATED_BY', nullable: true })
  createdBy: string;

  @Column({ name: 'UPDATED_BY', nullable: true })
  updatedBy: string;

  @VersionColumn({ name: 'VERSION' })
  version: number;
}
