import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CheckDuplicatePhoneNumberQuery } from "./check-duplicate-phone-number.query";
import { UserRepository } from "@user/repositories/user.repository";
import { Inject } from "@nestjs/common";

@QueryHandler(CheckDuplicatePhoneNumberQuery)
export class CheckDuplicatePhoneNumberHandler implements IQueryHandler<CheckDuplicatePhoneNumberQuery> {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: ReturnType<typeof UserRepository>,
    ) {}

    async execute(query: CheckDuplicatePhoneNumberQuery): Promise<boolean> {
        const { phoneNumber } = query;
        const user = await this.userRepository.findOne({ where: { phoneNumber } });
        return !!user;
    }
}