import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../../common/base.entity";

@Entity('TITLES')
export class Title extends BaseEntity {
  @Column({ name: 'TITLE_CODE' })
  @Index({ unique: true })
  titleCode: string;

  @Column({ name: 'TITLE_NAME' })
  titleName: string;

  @Column({ name: 'ORDER', nullable: true })
  order: number;

  @Column({ name: 'IS_ACTIVE', default: true })
  isActive: boolean;
}