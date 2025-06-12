import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../impl/get-user.query';
import { GetUsersQuery } from '../impl/get-users.query';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../../dto/user-response.dto';
@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    constructor(
        @Inject('UserRepository')
        private readonly userRepo: ReturnType<typeof UserRepository>
    ) {}

    async execute(query: GetUserQuery): Promise<any> {
        // TODO: Implement get user detail logic
        return plainToInstance(UserResponseDto, await this.userRepo.findOne({ where: { id: query.id } }));
    }
}

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
    constructor(
        @Inject('UserRepository')
        private readonly userRepo: ReturnType<typeof UserRepository>
    ) {}

    async execute(query: GetUsersQuery): Promise<any> {
        // TODO: Implement get users with pagination logic
        return await this.userRepo.getUsersWithPagination(query.page, query.limit);
    }
} 