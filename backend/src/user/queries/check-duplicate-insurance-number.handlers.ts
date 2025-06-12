import { IQueryHandler } from "@nestjs/cqrs";

import { QueryHandler } from "@nestjs/cqrs";
import { CheckDuplicateInsuranceNumberQuery } from "./check-duplicate-insurance-number.query";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(CheckDuplicateInsuranceNumberQuery)
export class CheckDuplicateInsuranceNumberHandler implements IQueryHandler<CheckDuplicateInsuranceNumberQuery> {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}
    async execute(query: CheckDuplicateInsuranceNumberQuery): Promise<boolean> {
        return !!await this.userRepo.findOne({ where: { insuranceNumber: query.insuranceNumber } });
    }
}