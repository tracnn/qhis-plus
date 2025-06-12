import { Repository } from 'typeorm';
import { District } from '../entities/district.entity';
import { PAGE_DEFAULT, LIMIT_DEFAULT } from '../../../constant/common.constant';
import { buildPagination } from '../../../common/pagination.util';

export const DistrictRepository = (repo: Repository<District>)  => repo.extend({
    
  async getDistrictsWithProvinceAndPagination(query: {
    page?: number,
    limit?: number,
    provinceId?: number,
  }) {
    const page = query.page && query.page > 0 ? query.page : PAGE_DEFAULT;
    const limit = query.limit && query.limit > 0 ? query.limit : LIMIT_DEFAULT;
    const offset = (page - 1) * limit;

    const qb = this.createQueryBuilder('d')
      .leftJoinAndSelect('d.province', 'p')
      .where('d.isActive = 1')
      .andWhere('d.isDelete = 0');

    if (query.provinceId) {
      qb.andWhere('d.provinceId = :provinceId', { provinceId: query.provinceId });
    }

    const [data, total] = await qb
      .orderBy('d.districtCode', 'ASC')
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    // Format lại dữ liệu trả về cho giống SQL cũ (nếu cần)
    const resultData = data.map((d: any) => ({
      id: d.id,
      districtCode: d.districtCode,
      districtName: d.districtName,
      provinceId: d.provinceId,
      provinceCode: d.province?.provinceCode,
      provinceName: d.province?.provinceName,
    }));

    return {
      data: resultData,
      pagination: buildPagination(page, limit, total),
    };
  }

});