import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreatePatientCommand } from '../impl/create-patient.command';
import { UpdatePatientCommand } from '../impl/update-patient.command';
import { DeletePatientCommand } from '../impl/delete-patient.command';

@Injectable()
export class PatientCommandService { }

@CommandHandler(CreatePatientCommand)
export class CreatePatientHandler implements ICommandHandler<CreatePatientCommand> {
    private readonly logger = new Logger(CreatePatientHandler.name);
    async execute(command: CreatePatientCommand): Promise<any> {
        this.logger.log(`Tạo bệnh nhân: ${command.fullName}`);
        try {
            // TODO: Implement create logic
            const result = {};
            this.logger.log('Tạo bệnh nhân thành công');
            return result;
        } catch (error) {
            this.logger.error('Lỗi khi tạo bệnh nhân', error.stack);
            throw error;
        }
    }
}

@CommandHandler(UpdatePatientCommand)
export class UpdatePatientHandler implements ICommandHandler<UpdatePatientCommand> {
    private readonly logger = new Logger(UpdatePatientHandler.name);
    async execute(command: UpdatePatientCommand): Promise<any> {
        this.logger.log(`Cập nhật bệnh nhân: ${command.id}`);
        try {
            // TODO: Implement update logic
            const result = {};
            this.logger.log('Cập nhật bệnh nhân thành công');
            return result;
        } catch (error) {
            this.logger.error('Lỗi khi cập nhật bệnh nhân', error.stack);
            throw error;
        }
    }
}

@CommandHandler(DeletePatientCommand)
export class DeletePatientHandler implements ICommandHandler<DeletePatientCommand> {
    private readonly logger = new Logger(DeletePatientHandler.name);
    async execute(command: DeletePatientCommand): Promise<any> {
        this.logger.warn(`Xóa (mềm) bệnh nhân: ${command.id}`);
        try {
            // TODO: Implement soft delete logic
            const result = {};
            this.logger.log('Xóa (mềm) bệnh nhân thành công');
            return result;
        } catch (error) {
            this.logger.error('Lỗi khi xóa (mềm) bệnh nhân', error.stack);
            throw error;
        }
    }
}
