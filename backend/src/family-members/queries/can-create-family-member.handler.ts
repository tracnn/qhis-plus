import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { CanCreateFamilyMemberQuery } from "./can-create-family-member.query";
import { FamilyMemberRepository } from "../repositories/family-member.repository";
import { ConflictException, Inject } from "@nestjs/common";
import { ERROR_409 } from "../../common/error-messages/error-409";
import { HealthInsuranceCardService } from "../../health-insurance-card/health-insurance-card.service";
import { CheckHealthInsuranceDto } from "../../health-insurance-card/dto/check-health-insurance.dto";
import { AddressLocationResolverService } from "../../user/services/address-location-resolver.service";
import { CheckDuplicateIdentityNumberQuery } from "@user/queries/check-duplicate-identity-number.query";

@QueryHandler(CanCreateFamilyMemberQuery)
export class CanCreateFamilyMemberHandler implements IQueryHandler<CanCreateFamilyMemberQuery> {
    constructor(
        @Inject('FamilyMemberRepository')
        private readonly familyMemberRepository: ReturnType<typeof FamilyMemberRepository>,
        private readonly healthInsuranceCardService: HealthInsuranceCardService,
        private readonly addressLocationResolverService: AddressLocationResolverService,
        private readonly queryBus: QueryBus,
    ) {}

    async execute(query: CanCreateFamilyMemberQuery): Promise<boolean> {

        const { identityNumber } = query.dto;
        const userId = query.req.user.userId;
        const userIdentityNumber = query.req.user.identityNumber;

        if (identityNumber === userIdentityNumber) {
            throw new ConflictException(ERROR_409.CONFLICT_DUPLICATE_IDENTITY_NUMBER_IN_USER);
        }
        
        const checkExistingIdentityNumber = await this.familyMemberRepository.findOne({
            where: {
                userId,
                identityNumber,
            },
        });

        if (checkExistingIdentityNumber) {
            throw new ConflictException(ERROR_409.CONFLICT_IDENTITY_NUMBER_IN_FAMILY_MEMBER);
        }

        const healthInsuranceCard = await this.healthInsuranceCardService.check(query.dto as CheckHealthInsuranceDto);

        const address = healthInsuranceCard.address;
        
        if (!address) {
            return { ...healthInsuranceCard }
        }

        const addressLocation = await this.addressLocationResolverService.resolve(address);

        return {
            ...healthInsuranceCard,
            ...addressLocation,
        }

    }
}