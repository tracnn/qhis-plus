import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCommunesByDistrictIdQuery } from './get-communes-by-district-id.query';
import { Commune } from '../entities/commune.entity';
import { CommuneRepository } from '../repositories/commune.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetCommunesByDistrictIdQuery)
export class GetCommunesByDistrictIdHandler implements IQueryHandler<GetCommunesByDistrictIdQuery> {
  constructor(
    @Inject('CommuneRepository')
    private readonly communeRepo: ReturnType<typeof CommuneRepository>
  ) {}

  async execute(query: GetCommunesByDistrictIdQuery): Promise<Commune[]> {
    return this.communeRepo.find({
      where: {
        districtId: query.districtId,
        isActive: 1,
        isDelete: 0,
      },
      order: {
        communeName: 'ASC',
      },
    });
  }
}