import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CommandBus } from '@nestjs/cqrs';
import { LoginDto } from './dto/login.dto';
import { LoginCommand } from './commands/login.command';

@Injectable()
export class AdminAuthService {
    constructor(
        private readonly commandBus: CommandBus,
    ) {}

    async hashPassword(password: string): Promise<string> {
        const secureText = '!@#$%^&*())(*&^%$#@!';
        const hashedPassword = crypto.createHash('sha512').update(password + secureText).digest('hex');
        return hashedPassword;
    }

    async login(dto: LoginDto): Promise<any> {
        return this.commandBus.execute(new LoginCommand(dto));
    }
}
