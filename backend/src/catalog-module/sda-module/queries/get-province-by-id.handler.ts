import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProvinceByIdQuery } from "./get-province-by-id.query";
import { ProvinceRepository } from "../repositories/province.repository";
import { NotFoundException } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { ERROR_404 } from "src/common/error-messages/error-404";

@QueryHandler(GetProvinceByIdQuery)
export class GetProvinceByIdHandler implements IQueryHandler<GetProvinceByIdQuery> {
  constructor(
    @Inject('ProvinceRepository')
    private readonly provinceRepository:ReturnType<typeof ProvinceRepository>,
  ) {}

  async execute(query: GetProvinceByIdQuery) {
    const { id } = query.dto;
    const province = await this.provinceRepository.findOne({ where: { id } });
    if (!province) {
      throw new NotFoundException(ERROR_404.NOT_FOUND_PROVINCE);
    }
    return province;
  }
}