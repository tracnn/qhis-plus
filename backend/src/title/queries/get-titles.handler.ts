import { IQueryHandler } from "@nestjs/cqrs";
import { GetTitlesQuery } from "./get-titles.query";
import { QueryHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { Title } from "../entities/title.entity";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "src/constant/common.constant";
import { buildPagination } from "../../common/pagination.util";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(GetTitlesQuery)
export class GetTitlesHandler implements IQueryHandler<GetTitlesQuery> {
  constructor(
    @InjectRepository(Title)
    private readonly titleRepository: Repository<Title>,
  ) {}

  async execute(query: GetTitlesQuery): Promise<any> {
    const { getTitlesDto } = query;
    const page = getTitlesDto.page && getTitlesDto.page > 0 ? 
    getTitlesDto.page : PAGE_DEFAULT;
    const limit = getTitlesDto.limit && getTitlesDto.limit > 0 ? 
    getTitlesDto.limit : LIMIT_DEFAULT;
    const offset = (page - 1) * limit;

    const [data, total] = await this.titleRepository.findAndCount({
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