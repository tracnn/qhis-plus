import { IQueryHandler } from "@nestjs/cqrs";
import { GetSpecialtyQuery } from "./get-specialty.query";
import { QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Specialty } from "../entities/specialty.entity";
import { NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "@common/error-messages/error-404";

@QueryHandler(GetSpecialtyQuery)
export class GetSpecialtyHandler implements IQueryHandler<GetSpecialtyQuery> {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,
  ) {}

  async execute(query: GetSpecialtyQuery): Promise<any> {
    const { specialtyId } = query;
    const specialty = await this.specialtyRepository.findOne({ where: { id: specialtyId } });

    if (!specialty) {
      throw new NotFoundException(ERROR_404.NOT_FOUND_SPECIALTY);
    }

    return specialty;
  }
}