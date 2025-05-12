import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../../shared/base/base.entity";

@Entity('rules')
export class Rule extends BaseEntity {
    @Column({ type: 'varchar', length: 255 })
    rule_code: string;

    @Column({ type: 'varchar', length: 255 })
    rule_name: string;

    @Column({ type: 'varchar', length: 255 })
    rule_group: string;

    @Column({ type: 'varchar', length: 500 })
    condition: string;

    @Column({ type: 'varchar', length: 255 })
    event_type: string;

    @Column({ type: 'varchar', length: 500 })
    message: string;
}