import { Column, Entity } from "typeorm";
import { BaseHisEntity } from "../../../common/base.his.entity";

@Entity('SDA_ETHNIC')
export class Ethnic extends BaseHisEntity {
  @Column({ name: 'ETHNIC_CODE' })
  ethnicCode: string;

  @Column({ name: 'ETHNIC_NAME' })
  ethnicName: string;

  @Column({ name: 'OTHER_NAME' })
  otherName: string;
}