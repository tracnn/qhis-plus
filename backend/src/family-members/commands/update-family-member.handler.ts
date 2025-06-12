import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateFamilyMemberCommand } from "./update-family-member.command";
import { Inject } from "@nestjs/common";
import { FamilyMemberRepository } from "../repositories/family-member.repository";
import { HealthInsuranceCardService } from "src/health-insurance-card/health-insurance-card.service";
import { CheckHealthInsuranceDto } from "src/health-insurance-card/dto/check-health-insurance.dto";

@CommandHandler(UpdateFamilyMemberCommand)
export class UpdateFamilyMemberHandler implements ICommandHandler<UpdateFamilyMemberCommand> {
    constructor(
        @Inject('FamilyMemberRepository')
        private readonly familyMemberRepository: ReturnType<typeof FamilyMemberRepository>,
        private readonly healthInsuranceCardService: HealthInsuranceCardService,
    ) {}

    async execute(command: UpdateFamilyMemberCommand): Promise<any> {
        const { userId, id, updateFamilyMemberDto } = command;

        await this.healthInsuranceCardService.check(updateFamilyMemberDto as CheckHealthInsuranceDto);

        return this.familyMemberRepository.updateByUser(userId, id, updateFamilyMemberDto);
    }
}