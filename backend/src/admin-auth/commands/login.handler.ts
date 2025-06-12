import { ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { CommandHandler } from "@nestjs/cqrs";
import { LoginCommand } from "./login.command";
import { ValidateCredentialsCommand } from "src/catalog-module/acs-module/queries/validate-credentials.command";
import { UnauthorizedException } from "@nestjs/common";
import { AdminAuthService } from "../admin-auth.service";

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly adminAuthService: AdminAuthService,
    ) {}

    async execute(command: LoginCommand): Promise<any> {
        const { dto } = command;
        const { username, password } = dto;

        const hashedPassword = await this.adminAuthService.hashPassword(password);

        const user = await this.queryBus.execute(new ValidateCredentialsCommand({
            username,
            password: hashedPassword,
        }));

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return user;
    }
}