import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllProvincesQuery } from './get-all-provinces.query';
import { Province } from '../entities/province.entity';
import { ProvinceRepository } from '../repositories/province.repository';
import { Inject } from '@nestjs/common';
@QueryHandler(GetAllProvincesQuery)
export class GetAllProvincesHandler implements IQueryHandler<GetAllProvincesQuery> {
  constructor(
    @Inject('ProvinceRepository')
    private readonly provinceRepo: ReturnType<typeof ProvinceRepository>
  ) {}

  async execute(query: GetAllProvincesQuery): Promise<Province[]> {
    return await this.provinceRepo.find({
      where: { isActive: 1, isDelete: 0 },
      order: { provinceName: 'ASC' },
    });
  }
}