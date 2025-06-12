import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCommunesQuery } from './get-communes.query';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../constant/common.constant';
import { CommuneRepository } from '../repositories/commune.repository';
import { Inject } from '@nestjs/common';
@QueryHandler(GetCommunesQuery)
export class GetCommunesHandler implements IQueryHandler<GetCommunesQuery> {
  constructor(
    @Inject('CommuneRepository')
    private readonly communeRepo: ReturnType<typeof CommuneRepository>
  ) {}

  async execute(query: GetCommunesQuery) {
    const page = query.page > 0 ? query.page : PAGE_DEFAULT;
    const limit = query.limit > 0 ? query.limit : LIMIT_DEFAULT;

    return await this.communeRepo.getCommunesWithPagination({
      page,
      limit,
      districtId: query.districtId,
    });
  }
}