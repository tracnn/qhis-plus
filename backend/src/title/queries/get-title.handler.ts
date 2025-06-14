import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetTitleQuery } from "./get-title.query";
import { Repository } from "typeorm";
import { Title } from "../entities/title.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "@common/error-messages/error-404";

@QueryHandler(GetTitleQuery)
export class GetTitleHandler implements IQueryHandler<GetTitleQuery> {
  constructor(
    @InjectRepository(Title)
    private readonly titleRepository: Repository<Title>,
  ) {}

  async execute(query: GetTitleQuery): Promise<any> {
    const { titleId } = query;
    const title = await this.titleRepository.findOne({ where: { id: titleId } });

    if (!title) {
      throw new NotFoundException(ERROR_404.NOT_FOUND_TITLE);
    }
    return title;
  }
}