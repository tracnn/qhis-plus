import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetNationalsQuery } from "./get-nationals.query";
import { National } from "../entities/national.entity";
import { Repository } from "typeorm";
import { BASE_SCHEMA } from "../../../constant/common.constant";
import { InjectRepository } from "@nestjs/typeorm";

@QueryHandler(GetNationalsQuery)
export class GetNationalsHandler implements IQueryHandler<GetNationalsQuery> {
  constructor(
    @InjectRepository(National, BASE_SCHEMA.SDA_RS)
    private readonly nationalRepository: Repository<National>
  ) {}

  async execute(query: GetNationalsQuery): Promise<National[]> {
    return await this.nationalRepository.find({
      where: {
        isActive: 1,
        isDelete: 0,
      },
    });
  }
}