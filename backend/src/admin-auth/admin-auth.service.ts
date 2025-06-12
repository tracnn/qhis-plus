import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AdminLoginDto } from './dto/login.dto';
import { AdminLoginCommand } from './commands/login.command';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AdminMeQuery } from './queries/admin-me.query';

@Injectable()
export class AdminAuthService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly queryBus: QueryBus,
    ) {}

    async hashPassword(password: string): Promise<string> {
        const secureText = '!@#$%^&*())(*&^%$#@!';
        const hashedPassword = crypto.createHash('sha512').update(password + secureText).digest('hex');
        return hashedPassword;
    }

    async login(dto: AdminLoginDto): Promise<any> {
        return this.commandBus.execute(new AdminLoginCommand(dto));
    }

    async generateRefreshToken(payload: any): Promise<string> {
        return this.jwtService.sign(payload, {
            secret: this.configService.get<string>('REFRESH_TOKEN_SECRET') || '',
            expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN') || '7d',
        });
    }

    async adminMe(userId: number): Promise<any> {
        return this.queryBus.execute(new AdminMeQuery(userId));
    }
}
