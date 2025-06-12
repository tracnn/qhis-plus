import { Repository } from 'typeorm';
import { SupportRequest } from '../entities/support-request.entity';
import { plainToInstance } from 'class-transformer';

export const SupportRequestRepository = (repo: Repository<SupportRequest>) => repo.extend({
    
});