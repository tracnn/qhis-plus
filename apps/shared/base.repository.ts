import { Repository, DataSource, EntityTarget, DeepPartial } from 'typeorm';
import { BaseModel } from './base.model';

export abstract class BaseRepository<T extends BaseModel> {
  protected readonly repository: Repository<T>;

  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    this.repository = dataSource.getRepository(entity);
  }

  async add(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return this.repository.save(newEntity);
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    await this.repository.update(id, data as any);
    const updatedEntity = await this.find(id);
    return updatedEntity;
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async restore(id: number): Promise<void> {
    await this.repository.restore(id);
  }

  async find(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as any);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findByCondition(condition: Partial<T>): Promise<T[]> {
    return this.repository.find({ where: condition as any });
  }

  async findOneByCondition(condition: Partial<T>): Promise<T | null> {
    return this.repository.findOne({ where: condition as any });
  }
}