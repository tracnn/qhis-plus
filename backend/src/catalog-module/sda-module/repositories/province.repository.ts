import { Repository } from 'typeorm';
import { Province } from '../entities/province.entity';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '../../../constant/common.constant';
import { buildPagination } from '../../../common/pagination.util';

export const ProvinceRepository = (repo: Repository<Province>) => repo.extend({
    
    async getProvincesWithPagination(query: {
        page?: number,
        limit?: number,
        }) {

        const page = query.page && query.page > 0 ? query.page : PAGE_DEFAULT;
        const limit = query.limit && query.limit > 0 ? query.limit : LIMIT_DEFAULT;
        const offset = (page - 1) * limit;

        const qb = this.createQueryBuilder('d')
            .where('d.isActive = 1')
            .andWhere('d.isDelete = 0')
            .orderBy('d.provinceCode', 'ASC')
            .skip(offset)
            .take(limit);

        const [data, total] = await qb.getManyAndCount();

        // Nếu cần format lại dữ liệu cho đồng bộ với raw SQL:
        const resultData = data.map((d: any) => ({
            id: d.id,
            provinceCode: d.provinceCode,
            provinceName: d.provinceName,
        }));

        return {
            data: resultData,
            pagination: buildPagination(page, limit, total),
        };
    }

});