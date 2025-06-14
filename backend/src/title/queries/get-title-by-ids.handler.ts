import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Title } from "../entities/title.entity";
import { GetTitleByIdsQuery } from "./get-title-by-ids.query";

@QueryHandler(GetTitleByIdsQuery)
export class GetTitleByIdsHandler implements IQueryHandler<GetTitleByIdsQuery> {
  constructor(
    @InjectRepository(Title) private readonly titleRepository: Repository<Title>
  ) {}

  async execute(query: GetTitleByIdsQuery): Promise<any> {
    const { titleIds } = query;
    if (!titleIds?.length) return [];

    const chunkSize = 500; // Oracle giới hạn 1000 phần tử cho IN
    const chunkArray = (arr: string[], size: number) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
      );

    let allTitles: any[] = [];
    for (const chunk of chunkArray(titleIds, chunkSize)) {
      const items = await this.titleRepository.find({
        where: {
          id: In(chunk),
          isActive: true,
        },
      });
      allTitles = allTitles.concat(items);
    }
    return allTitles;
  }
}