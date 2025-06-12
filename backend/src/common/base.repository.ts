import { Repository, ObjectLiteral } from 'typeorm';

export const baseRepository = <T extends ObjectLiteral>(repo: Repository<T>) =>
    repo.extend({
        async findAll(): Promise<T[]> {
        return this.find();
        },

        async findById(id: number): Promise<T | null> {
        return this.findOne({ where: { id } as any });
        },

        async createAndSave(data: Partial<T>): Promise<T> {
        const entity = this.create(data);
        return this.save(entity);
        },

        async deleteById(id: number): Promise<void> {
        await this.delete(id);
        },
    });