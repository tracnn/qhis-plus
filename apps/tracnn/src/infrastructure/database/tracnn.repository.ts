import { Injectable } from '@nestjs/common';
import { ITracnnRepository } from '../../application/ports/outbound/tracnn.repository.interface';
import { Tracnn } from '../../domain/entities/tracnn.entity';

export class TracnnRepository implements ITracnnRepository {
  async findById(id: string): Promise<Tracnn | null> {
    return new Tracnn(id, 'demo-value');
  }
  async save(entity: Tracnn): Promise<void> {
    console.log('Saved', entity);
  }
}
