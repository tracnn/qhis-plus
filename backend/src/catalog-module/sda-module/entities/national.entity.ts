import { Column, Entity } from "typeorm";
import { BaseHisEntity } from "../../../common/base.his.entity";

@Entity('SDA_NATIONAL')
export class National extends BaseHisEntity {
  @Column({ name: 'NATIONAL_CODE' })
  nationalCode: string;

  @Column({ name: 'NATIONAL_NAME' })
  nationalName: string;

  @Column({ name: 'MPS_NATIONAL_CODE' })
  mpsNationalCode: string;
}