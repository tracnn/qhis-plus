import { Repository } from 'typeorm';
import { Otp } from '../entities/otp.entity';
import { plainToInstance } from 'class-transformer';
import { OtpResponseDto } from '../dto/otp-response.dto';
export const OtpRepository = (repo: Repository<Otp>) => repo.extend({
    
    async findByPhoneNumber(phoneNumber: string) {
        return plainToInstance(OtpResponseDto, await this.findOne({ where: { phoneNumber } }));
    },
});