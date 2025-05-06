import { Injectable } from '@nestjs/common';
import { IThaovhRepository } from '../../application/ports/outbound/thaovh.repository.interface';
import { Thaovh } from '../../domain/entities/thaovh.entity';

export class ThaovhRepository implements IThaovhRepository {
  async findById(id: string): Promise<Thaovh | null> {
    return new Thaovh(id, 'demo-value');
  }
  async save(entity: Thaovh): Promise<void> {
    console.log('Saved', entity);
  }
}
