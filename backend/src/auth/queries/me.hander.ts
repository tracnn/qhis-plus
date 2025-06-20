import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { MeQuery } from "./me.query";
import { Repository } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundException } from "@nestjs/common";
import { ERROR_404 } from "@common/error-messages/error-404";
import { UserResponseDto } from "../../user/dto/user-response.dto";
import { plainToInstance } from "class-transformer";

@QueryHandler(MeQuery)
export class MeQueryHandler implements IQueryHandler<MeQuery> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) { }

    async execute(query: MeQuery) {
        return plainToInstance(UserResponseDto, await this.userRepository.findOne({ where: { id: query.userId } }));
    }
}