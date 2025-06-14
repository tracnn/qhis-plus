import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { CreateSpecialtyCommand } from "./create-specialty.command";
import { Specialty } from "../entities/specialty.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ERROR_400 } from "../../common/error-messages/error-400";
import { BadRequestException } from "@nestjs/common";

@CommandHandler(CreateSpecialtyCommand)
export class CreateSpecialtyHandler implements ICommandHandler<CreateSpecialtyCommand> {
    constructor(
        @InjectRepository(Specialty)
        private readonly specialtyRepository: Repository<Specialty>,
    ) {}

    async execute(command: CreateSpecialtyCommand): Promise<any> {
        const { specialtyCode, specialtyName, specialtyDescription, order } = command.createSpecialtyDto;
        
        const checkSpecialty = await this.specialtyRepository.findOne({ where: { specialtyCode } });
        if (checkSpecialty) {
            throw new BadRequestException(ERROR_400.SPECIALTY_ALREADY_EXISTS);
        }
        const specialty = this.specialtyRepository.create({
            specialtyCode,
            specialtyName,
            specialtyDescription,
            order,
        });
        return this.specialtyRepository.save(specialty);
    }
}