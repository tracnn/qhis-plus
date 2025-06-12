import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProvincesQuery } from './get-provinces.query';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../constant/common.constant';
import { ProvinceRepository } from '../repositories/province.repository';
import { Inject } from '@nestjs/common';
@QueryHandler(GetProvincesQuery)
export class GetProvincesHandler implements IQueryHandler<GetProvincesQuery> {
  constructor(
    @Inject('ProvinceRepository')
    private readonly provinceRepo: ReturnType<typeof ProvinceRepository>
  ) {}

  async execute(query: GetProvincesQuery) {
    const page = query.page > 0 ? query.page : PAGE_DEFAULT;
    const limit = query.limit > 0 ? query.limit : LIMIT_DEFAULT;
    
    return await this.provinceRepo.getProvincesWithPagination({
      page,
      limit,
    });
  }
}