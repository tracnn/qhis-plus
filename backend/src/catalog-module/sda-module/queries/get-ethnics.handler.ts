import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetEthnicsQuery } from "./get-ethnics.query";
import { Ethnic } from "../entities/ethnic.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BASE_SCHEMA } from "../../../constant/common.constant";

@QueryHandler(GetEthnicsQuery)
export class GetEthnicsHandler implements IQueryHandler<GetEthnicsQuery> {
  constructor(
    @InjectRepository(Ethnic, BASE_SCHEMA.SDA_RS)
    private readonly ethnicRepository: Repository<Ethnic>
  ) { }

  async execute(query: GetEthnicsQuery): Promise<Ethnic[]> {
    return await this.ethnicRepository.find({
      where: {
        isActive: 1,
        isDelete: 0,
      },
    });
  }
}