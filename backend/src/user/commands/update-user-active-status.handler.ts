import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserActiveStatusCommand } from './update-user-active-status.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateUserActiveStatusCommand)
export class UpdateUserActiveStatusHandler implements ICommandHandler<UpdateUserActiveStatusCommand> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async execute(command: UpdateUserActiveStatusCommand): Promise<any> {
        const { userId, isActive } = command;
        return await this.userRepository.update(userId, { isActive: isActive ? 1 : 0 }); // Oracle dùng number
    }
}