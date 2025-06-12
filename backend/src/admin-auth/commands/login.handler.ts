import { ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { CommandHandler } from "@nestjs/cqrs";
import { AdminLoginCommand } from "./login.command";
import { ValidateCredentialsCommand } from "src/catalog-module/acs-module/queries/validate-credentials.command";
import { Logger, UnauthorizedException } from "@nestjs/common";
import { AdminAuthService } from "../admin-auth.service";
import { ERROR_401 } from "src/common/error-messages/error-401";
import { JwtService } from '@nestjs/jwt';
import { USER_TYPE } from "src/constant/common.constant";

@CommandHandler(AdminLoginCommand)
export class AdminLoginHandler implements ICommandHandler<AdminLoginCommand> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly adminAuthService: AdminAuthService,
        private readonly jwtService: JwtService,
    ) {}

    async execute(command: AdminLoginCommand): Promise<any> {
        const { dto } = command;
        const { username, password } = dto;

        const hashedPassword = await this.adminAuthService.hashPassword(password);

        const user = await this.queryBus.execute(new ValidateCredentialsCommand({
            username,
            password: hashedPassword,
        }));

        if (!user) {
            throw new UnauthorizedException(ERROR_401.INVALID_CREDENTIALS);
        }

        const payload = {
            sub: user.userId,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            type: USER_TYPE.STAFF,
        };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.adminAuthService['configService'].get<string>('JWT_ADMIN_SECRET') || '',
            expiresIn: this.adminAuthService['configService'].get<string>('JWT_ADMIN_EXPIRES_IN') || '3600s',
        });
        const refreshToken = await this.adminAuthService.generateRefreshToken(payload);
        return { accessToken, refreshToken };
    }
}