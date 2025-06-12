import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDistrictsQuery } from './get-districts.query';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../constant/common.constant';
import { DistrictRepository } from '../repositories/district.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetDistrictsQuery)
export class GetDistrictsHandler implements IQueryHandler<GetDistrictsQuery> {
  constructor(
    @Inject('DistrictRepository')
    private readonly districtRepo: ReturnType<typeof DistrictRepository>
  ) {}

  async execute(query: GetDistrictsQuery) {
    const page = query.page > 0 ? query.page : PAGE_DEFAULT;
    const limit = query.limit > 0 ? query.limit : LIMIT_DEFAULT;

    return await this.districtRepo.getDistrictsWithProvinceAndPagination({
      page,
      limit,
      provinceId: query.provinceId,
    });
  }  
}