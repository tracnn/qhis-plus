import { CommandHandler } from "@nestjs/cqrs";
import { ICommandHandler } from "@nestjs/cqrs";
import { CreateFamilyMemberCommand } from "./create-family-member.command";
import { FamilyMemberRepository } from "../repositories/family-member.repository";
import { BadRequestException, Inject } from "@nestjs/common";
import { ERROR_409 } from "@common/error-messages/error-409";
import { HealthInsuranceCardService } from "../../health-insurance-card/health-insurance-card.service";

@CommandHandler(CreateFamilyMemberCommand)
export class CreateFamilyMemberHandler implements ICommandHandler<CreateFamilyMemberCommand> {
    constructor(
        @Inject('FamilyMemberRepository')
        private readonly familyMemberRepository: ReturnType<typeof FamilyMemberRepository>,
        private readonly healthInsuranceCardService: HealthInsuranceCardService,
    ) {}

    async execute(command: CreateFamilyMemberCommand): Promise<any> {
        const { userId, dto } = command;
        
        if(dto.identityNumber) {
            const existingFamilyMember = await this.familyMemberRepository.findOne({ where: { identityNumber: dto.identityNumber } });
            if (existingFamilyMember) {
                throw new BadRequestException(ERROR_409.CONFLICT_IDENTITY_NUMBER);
            }
        }
        if(dto.insuranceNumber) {
            const existingFamilyMember = await this.familyMemberRepository.findOne({ where: { insuranceNumber: dto.insuranceNumber } });
            if (existingFamilyMember) {
                throw new BadRequestException(ERROR_409.CONFLICT_INSURANCE_NUMBER);
            }
        }
        
        await this.healthInsuranceCardService.check(dto);

        return this.familyMemberRepository.createByUser(userId, dto);
    }
}