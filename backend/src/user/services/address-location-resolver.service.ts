import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllProvincesQuery } from '../../catalog-module/sda-module/queries/get-all-provinces.query';
import { GetDistrictsByProvinceIdQuery } from '../../catalog-module/sda-module/queries/get-districts-by-province-id.query';
import { GetCommunesByDistrictIdQuery } from '../../catalog-module/sda-module/queries/get-communes-by-district-id.query';


interface LocationResult {
  provinceId: number | null;
  provinceCode: string | null;
  districtId: number | null;
  districtCode: string | null;
  communeId: number | null;
  communeCode: string | null;
}

@Injectable()
export class AddressLocationResolverService {
    constructor(private readonly queryBus: QueryBus) {}

    async resolve(address: string): Promise<any> {
        const parts = address.split(',').map(p => p.trim()).reverse();
        const remainingParts = parts.slice(3).join(' ').replace(/,/g, '').trim() || null;

        const normalizedParts = parts.map(this.normalizeLocationName);

        const normalizedProvincePart = normalizedParts[0] || '';
        const normalizedDistrictPart = normalizedParts[1] || '';
        const normalizedCommunePart = normalizedParts[2] || '';

        // 1. Lấy danh sách tỉnh
        const provinces = await this.queryBus.execute(new GetAllProvincesQuery());

        const province = provinces.find((p: any) =>
        this.normalizeLocationName(p.provinceName) === normalizedProvincePart
        );

        if (!province) {
            return { provinceId: null, 
                provinceCode: null,
                provinceName: null,
                districtId: null,
                districtCode: null,
                districtName: null,
                communeId: null,
                communeCode: null,
                communeName: null,
                remainingAddress: remainingParts,
            };
        }

        // 2. Lấy danh sách huyện trong tỉnh
        const districts = await this.queryBus.execute(new GetDistrictsByProvinceIdQuery(province.id));
        const district = districts.find((d: any) =>
            this.normalizeLocationName(d.districtName) === normalizedDistrictPart
        );

        if (!district) {
            return { 
                provinceId: province.id, 
                provinceCode: province.provinceCode, 
                provinceName: province.provinceName,
                districtId: null, 
                districtCode: null, 
                districtName: null,
                communeId: null, 
                communeCode: null, 
                communeName: null,
                remainingAddress: remainingParts,
            };
        }

        // 3. Lấy danh sách xã trong huyện
        const communes = await this.queryBus.execute(new GetCommunesByDistrictIdQuery(district.id));
        const commune = communes.find((c: any) =>
            this.normalizeLocationName(c.communeName) === normalizedCommunePart ||
            normalizedCommunePart.includes(this.normalizeLocationName(c.communeName)) ||
            this.normalizeLocationName(c.communeName).includes(normalizedCommunePart)
        );

        if (!commune) {
            return { 
                provinceId: province.id, 
                provinceCode: province.provinceCode,
                provinceName: province.provinceName,
                districtId: district.id, 
                districtCode: district.districtCode, 
                districtName: district.districtName,
                communeId: null, 
                communeCode: null,
                communeName: null,
                remainingAddress: remainingParts,
            };
        }

        return {
            provinceId: province.id,
            provinceCode: province.provinceCode,
            provinceName: province.provinceName,
            districtId: district.id,
            districtCode: district.districtCode,
            districtName: district.districtName,
            communeId: commune.id,
            communeCode: commune.communeCode,
            communeName: commune.communeName,
            remainingAddress: remainingParts,
        };
    }

    private normalizeLocationName(name: string | null | undefined): string {
        if (!name || typeof name !== 'string') return '';
        return name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Xóa dấu tiếng Việt
          .replace(/^(tp|thanh pho|tinh|city|quan|huyen|thi xa|thi tran|phuong|xa)\s+/g, '')
          .replace(/\s+/g, ' ')
          .trim();
    }
}