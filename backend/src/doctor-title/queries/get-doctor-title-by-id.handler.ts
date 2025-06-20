import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetDoctorTitleByIdQuery } from "./get-doctor-title-by-id.query";
import { InjectRepository } from "@nestjs/typeorm";
import { DoctorTitle } from "../entities/doctor-title.entity";
import { Repository } from "typeorm";
import { ERROR_404 } from "@common/error-messages/error-404";
import { NotFoundException } from "@nestjs/common";

@QueryHandler(GetDoctorTitleByIdQuery)
export class GetDoctorTitleByIdHandler implements IQueryHandler<GetDoctorTitleByIdQuery> {
    constructor(
        @InjectRepository(DoctorTitle) private readonly doctorTitleRepository: Repository<DoctorTitle>,
    ) {}

    async execute(query: GetDoctorTitleByIdQuery): Promise<any> {
        const { id } = query;
        const doctorTitle = await this.doctorTitleRepository.findOne({
            where: { id },
            relations: ['title', 'specialty'],
        });
        if (!doctorTitle) {
            throw new NotFoundException(ERROR_404.NOT_FOUND_DOCTOR_TITLE);
        }
        return doctorTitle;
    }
}