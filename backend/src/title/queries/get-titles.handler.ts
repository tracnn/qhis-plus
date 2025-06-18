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
    const data = await this.titleRepository.find({
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