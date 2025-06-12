import { Repository } from 'typeorm';
import { Commune } from '../entities/commune.entity';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../constant/common.constant';
import { buildPagination } from '../../../common/pagination.util';

export const CommuneRepository = (repo: Repository<Commune>) => repo.extend({
    
  async getCommunesWithPagination(query: {
    page?: number;
    limit?: number;
    districtId?: number;
  }) {
 
    const page = query.page && query.page > 0 ? query.page : PAGE_DEFAULT;
    const limit = query.limit && query.limit > 0 ? query.limit : LIMIT_DEFAULT;
    const offset = (page - 1) * limit;

    const qb = this.createQueryBuilder('d')
      .leftJoinAndSelect('d.district', 'di')
      .leftJoinAndSelect('di.province', 'p')
      .where('d.isActive = 1')
      .andWhere('d.isDelete = 0');

    if (query.districtId) {
      qb.andWhere('d.districtId = :districtId', { districtId: query.districtId });
    }

    const [data, total] = await qb
      .orderBy('d.communeCode', 'ASC')
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    // Format lại dữ liệu trả về cho giống raw SQL (nếu cần)
    const resultData = data.map((d: any) => ({
      id: d.id,
      communeCode: d.communeCode,
      communeName: d.communeName,
      districtId: d.districtId,
      districtCode: d.district?.districtCode,
      districtName: d.district?.districtName,
      provinceId: d.district?.provinceId,
      provinceCode: d.district?.province?.provinceCode,
      provinceName: d.district?.province?.provinceName,
    }));

    return {
      data: resultData,
      pagination: buildPagination(page, limit, total),
    };
  }

});