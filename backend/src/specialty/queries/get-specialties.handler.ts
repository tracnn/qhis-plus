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
    const data = await this.specialtyRepository.find({
      where: { isActive: true },
      order: {
        order: 'ASC',
      },
    });

    return {
      data
    };
  }
}

