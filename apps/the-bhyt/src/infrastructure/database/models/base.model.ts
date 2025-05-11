import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
    Column,
    BaseEntity,
  } from 'typeorm';
  
export abstract class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @VersionColumn()
    version: number = 0;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn({ nullable: true })
    deleted_at: Date | null;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    created_by: string | null;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    updated_by: string | null;
  }