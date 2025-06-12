import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFamilyMembersByUserIdQuery } from './get-family-members-by-user-id.query';
import { Repository } from 'typeorm';
import { FamilyMember } from '../entities/family-member.entity';
import { InjectRepository } from '@nestjs/typeorm';

@QueryHandler(GetFamilyMembersByUserIdQuery)
export class GetFamilyMembersByUserIdHandler implements IQueryHandler<GetFamilyMembersByUserIdQuery> {
    constructor(
        @InjectRepository(FamilyMember)
        private readonly familyMemberRepository: Repository<FamilyMember>,
    ) {}

    async execute(query: GetFamilyMembersByUserIdQuery): Promise<any> {
        const { userId } = query;
        const data = await this.familyMemberRepository.find({
            where: {
                userId: userId,
            },
        });
        return data;
    }
}