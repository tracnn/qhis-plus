import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateDoctorTitleCommand } from "./create-doctor-title.command";
import { CreateDoctorTitleDto } from "../dto/create-doctor-title.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DoctorTitle } from "../entities/doctor-title.entity";
import { Repository } from "typeorm";
import { BadRequestException } from "@nestjs/common";
import { ERROR_400 } from "@common/error-messages/error-400";

@CommandHandler(CreateDoctorTitleCommand)
export class CreateDoctorTitleHandler implements ICommandHandler<CreateDoctorTitleCommand> {
    constructor(
        @InjectRepository(DoctorTitle)
        private readonly doctorTitleRepository: Repository<DoctorTitle>,
    ) {}

    async execute(command: CreateDoctorTitleCommand): Promise<any> {
        const { createDoctorTitleDto } = command;

        const checkDoctorTitle = await this.doctorTitleRepository.findOne({
            where: {
                doctorId: createDoctorTitleDto.doctorId,
                titleId: createDoctorTitleDto.titleId,
            },
        });

        if (checkDoctorTitle) {
            throw new BadRequestException(ERROR_400.DOCTOR_TITLE_ALREADY_EXISTS);
        }
        
        const doctorTitle = this.doctorTitleRepository.create({
            doctorId: createDoctorTitleDto.doctorId,
            titleId: createDoctorTitleDto.titleId,
        });
        return await this.doctorTitleRepository.save(doctorTitle);
    }
}