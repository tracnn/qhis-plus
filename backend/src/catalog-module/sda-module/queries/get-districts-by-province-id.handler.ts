import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDistrictsByProvinceIdQuery } from './get-districts-by-province-id.query';
import { District } from '../entities/district.entity';
import { DistrictRepository } from '../repositories/district.repository';
import { Inject } from '@nestjs/common';
@QueryHandler(GetDistrictsByProvinceIdQuery)
export class GetDistrictsByProvinceIdHandler implements IQueryHandler<GetDistrictsByProvinceIdQuery> {
  constructor(
    @Inject('DistrictRepository')
    private readonly districtRepo: ReturnType<typeof DistrictRepository>
  ) {}

    async execute(query: GetDistrictsByProvinceIdQuery): Promise<District[]> {
        return this.districtRepo.find({
            where: {
                provinceId: query.provinceId,
                isActive: 1,
                isDelete: 0,
            },
            order: {
                districtName: 'ASC',
            },
        });
    }
}