import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CheckDuplicateIdentityNumberQuery } from './check-duplicate-identity-number.query';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(CheckDuplicateIdentityNumberQuery)
export class CheckDuplicateIdentityNumberHandler implements IQueryHandler<CheckDuplicateIdentityNumberQuery> {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async execute(query: CheckDuplicateIdentityNumberQuery): Promise<boolean> {
        return !!await this.userRepo.findOne({ where: { identityNumber: query.identityNumber } });
    }
}