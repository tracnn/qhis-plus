import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetSpecialtiesByIdsQuery } from "./get-specialties-by-ids.query";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Specialty } from "../entities/specialty.entity";

@QueryHandler(GetSpecialtiesByIdsQuery)
export class GetSpecialtiesByIdsHandler implements IQueryHandler<GetSpecialtiesByIdsQuery> {
  constructor(
    @InjectRepository(Specialty) private readonly specialtyRepository: Repository<Specialty>
  ) {}

  async execute(query: GetSpecialtiesByIdsQuery): Promise<any> {
    const { specialtyIds } = query;
    if (!specialtyIds?.length) return [];

    const chunkSize = 500; // Oracle giới hạn 1000 phần tử cho IN
    const chunkArray = (arr: string[], size: number) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
      );

    let allSpecialties: any[] = [];
    for (const chunk of chunkArray(specialtyIds, chunkSize)) {
      const items = await this.specialtyRepository.find({
        where: {
          id: In(chunk),
          isActive: true,
        },
      });
      allSpecialties = allSpecialties.concat(items);
    }
    return allSpecialties;
  }
}