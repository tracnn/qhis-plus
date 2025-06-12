import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCareersQuery } from './get-careers.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Career } from '../entities/career.entity';
import { buildPagination } from '../../../common/pagination.util';

@QueryHandler(GetCareersQuery)
export class GetCareersHandler implements IQueryHandler<GetCareersQuery> {
    constructor(
        @InjectRepository(Career, 'HIS_RS') // hoặc 'default' nếu bạn dùng db mặc định
        private readonly careerRepo: Repository<Career>,
    ) {}

    async execute(query: GetCareersQuery) {
        const page = query.page > 0 ? query.page : 1;
        const limit = query.limit > 0 ? query.limit : 10;
        const [items, total] = await this.careerRepo.findAndCount({
            where: {
                isActive: 1,
                isDelete: 0,
            },
        skip: (page - 1) * limit,
        take: limit,
        order: { careerCode: 'ASC' },
        });
        
        return {
            data: items,
            pagination: buildPagination(page, limit, total),
        };
    }
}