import { EntityRepository, Repository, IsNull } from 'typeorm';
import { Patient } from '../patient.entity';

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> {
    async softDeleteById(id: string, updatedBy: string) {
        return this.update(id, { updatedBy });
    }

    async findActive(options = {}) {
        return this.find({ where: { ...options } });
    }
} 