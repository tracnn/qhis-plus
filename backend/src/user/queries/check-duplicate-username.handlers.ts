import { IQueryHandler } from "@nestjs/cqrs";

import { Inject } from "@nestjs/common";
import { CheckDuplicateUsernameQuery } from "./check-duplicate-username.query";
import { QueryHandler } from "@nestjs/cqrs";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(CheckDuplicateUsernameQuery)
export class CheckDuplicateUsernameHandler implements IQueryHandler<CheckDuplicateUsernameQuery> {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}
    async execute(query: CheckDuplicateUsernameQuery): Promise<boolean> {
        return !!(await this.userRepo.findOne({ where: { username: query.username } }));
    }
}