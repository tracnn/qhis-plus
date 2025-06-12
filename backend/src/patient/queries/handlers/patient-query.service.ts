import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { GetPatientQuery } from '../impl/get-patient.query';
import { GetPatientsQuery } from '../impl/get-patients.query';

@Injectable()
export class PatientQueryService { }

@QueryHandler(GetPatientQuery)
export class GetPatientHandler implements IQueryHandler<GetPatientQuery> {
    private readonly logger = new Logger(GetPatientHandler.name);
    async execute(query: GetPatientQuery): Promise<any> {
        this.logger.log(`Lấy chi tiết bệnh nhân: ${query.id}`);
        try {
            // TODO: Implement get patient detail logic
            const result = {};
            this.logger.log('Lấy chi tiết bệnh nhân thành công');
            return result;
        } catch (error) {
            this.logger.error('Lỗi khi lấy chi tiết bệnh nhân', error.stack);
            throw error;
        }
    }
}

@QueryHandler(GetPatientsQuery)
export class GetPatientsHandler implements IQueryHandler<GetPatientsQuery> {
    private readonly logger = new Logger(GetPatientsHandler.name);
    async execute(query: GetPatientsQuery): Promise<any> {
        this.logger.log(`Lấy danh sách bệnh nhân: page=${query.page}, limit=${query.limit}`);
        try {
            // TODO: Implement get patients with pagination logic
            const result = { data: [], pagination: { currentPage: 1, limit: 10, totalItems: 0, totalPages: 0, hasNext: false, hasPrev: false } };
            this.logger.log('Lấy danh sách bệnh nhân thành công');
            return result;
        } catch (error) {
            this.logger.error('Lỗi khi lấy danh sách bệnh nhân', error.stack);
            throw error;
        }
    }
}
