import { CommandHandler } from "@nestjs/cqrs";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { BASE_SCHEMA } from "../../constant/common.constant";
import { DataSource, Repository } from "typeorm";
import { CreateClinicSpecialtyCommand } from "./create-clinic-specialty.command";
import { ICommandHandler } from "@nestjs/cqrs";
import { ClinicSpecialty } from "../entities/clinic-specialty.entity";
import { ERROR_400 } from "@common/error-messages/error-400";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateClinicSpecialtyCommand)
export class CreateClinicSpecialtyHandler implements ICommandHandler<CreateClinicSpecialtyCommand> {
    constructor(
        @InjectRepository(ClinicSpecialty) private readonly clinicSpecialtyRepository: Repository<ClinicSpecialty>,
    ) {}

    async execute(command: CreateClinicSpecialtyCommand): Promise<any> {
        const { dto } = command;

        const checkClinicSpecialty = await this.clinicSpecialtyRepository.find({
            where: {
                clinicId: dto.clinicId,
                specialtyId: dto.specialtyId,
            },
        });

        if (checkClinicSpecialty.length > 0) {
            throw new BadRequestException(ERROR_400.CLINIC_SPECIALTY_ALREADY_EXISTS);
        }
        
        const clinicSpecialty = this.clinicSpecialtyRepository.create({
            clinicId: dto.clinicId,
            specialtyId: dto.specialtyId,
        });

        return this.clinicSpecialtyRepository.save(clinicSpecialty);
    }
}