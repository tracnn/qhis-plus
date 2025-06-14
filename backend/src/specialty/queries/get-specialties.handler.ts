import { IQueryHandler } from "@nestjs/cqrs";
import { GetSpecialtiesQuery } from "./get-specialties.query";
import { QueryHandler } from "@nestjs/cqrs";
import { Specialty } from "../entities/specialty.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "src/constant/common.constant";
import { buildPagination } from "@common/pagination.util";

@QueryHandler(GetSpecialtiesQuery)
export class GetSpecialtiesHandler implements IQueryHandler<GetSpecialtiesQuery> {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
  ) {}

  async execute(query: GetSpecialtiesQuery): Promise<any> {
    const { getSpecialtiesDto } = query;
    const page = getSpecialtiesDto.page && getSpecialtiesDto.page > 0 ? 
    getSpecialtiesDto.page : PAGE_DEFAULT;
    const limit = getSpecialtiesDto.limit && getSpecialtiesDto.limit > 0 ? 
    getSpecialtiesDto.limit : LIMIT_DEFAULT;
    const offset = (page - 1) * limit;

    const [data, total] = await this.specialtyRepository.findAndCount({
      where: { isActive: true },
      skip: offset,
      take: limit,
    });

    return {
      data,
      pagination: buildPagination(page, limit, total),
    };
  }
}

