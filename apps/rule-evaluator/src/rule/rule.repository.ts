import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Rule } from "./entities/rule.entity";
import { BaseRepository } from "../../../shared/base/base.repository";

@Injectable()
export class RuleRepository extends BaseRepository<Rule> {
    constructor( protected readonly dataSource: DataSource ) {
        super(Rule, dataSource);
    }
}
