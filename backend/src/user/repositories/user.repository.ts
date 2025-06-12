import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../dto/user-response.dto';

export const UserRepository = (repo: Repository<User>) => repo.extend({
    
    // add new method
    async findById(userId: string) {
        return plainToInstance(UserResponseDto, await this.findOne({ where: { id: userId } }));
    },
    async findByUsername(username: string) {
        return plainToInstance(UserResponseDto, await this.findOne({ where: { username } }));
    },
    async findByEmail(email: string) {
        return plainToInstance(UserResponseDto, await this.findOne({ where: { email } }));
    },
    async findByInsuranceNumber(insuranceNumber: string) {
        return plainToInstance(UserResponseDto, await this.findOne({ where: { insuranceNumber } }));
    },
    async findByIdentityNumber(identityNumber: string) {
        return plainToInstance(UserResponseDto, await this.findOne({ where: { identityNumber } }));
    },
    async findByPhoneAndUsername(phoneNumber: string, username: string) {
        return plainToInstance(UserResponseDto, await this.findOne({ where: { phoneNumber, username } }));
    },
    async findByPhoneAndIdentityNumber(phoneNumber: string, identityNumber: string) {
        return plainToInstance(UserResponseDto, await this.findOne({ where: { phoneNumber, identityNumber } }));
    },
    async updatePassword(userId: string, newPassword: string) {
        return plainToInstance(UserResponseDto, await this.update(userId, { password: newPassword }));
    },
    
    async getUsersWithPagination(page: number, limit: number) {
        const [users, total] = await this.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            data: plainToInstance(UserResponseDto, users),
            pagination: {
                total,
                page,
                limit,
                pageCount: Math.ceil(total / limit),
            },
        };
    }
});