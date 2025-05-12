import { Repository, DataSource, EntityTarget, ObjectLiteral, DeepPartial } from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
  constructor(entity: EntityTarget<T>, dataSource: DataSource) {
    super(entity, dataSource.createEntityManager());
  }

  async findAll(): Promise<T[]> {
    return this.find();
  }

  async findById(id: number): Promise<T | null> {
    return this.findOne({ where: { id } as any });
  }

  async createEntity(data: DeepPartial<T>): Promise<T> {
    const entity = this.create(data);
    return this.save(entity);
  }

  async updateEntity(id: number, data: Partial<T>): Promise<T> {
    await this.update(id, data);
    return this.findById(id) as Promise<T>;
  }

  async deleteEntity(id: number): Promise<void> {
    await this.delete(id);
  }
}