import { Inject, Injectable } from '@nestjs/common';
import { ITracnnUseCase } from '../ports/inbound/tracnn.usecase.interface';
import { ITracnnRepository } from '../ports/outbound/tracnn.repository.interface';
import { Tracnn } from '../../domain/entities/tracnn.entity';
import { TracnnDto } from '../dtos/tracnn.dto';

@Injectable()
export class TracnnUseCase implements ITracnnUseCase {
  constructor(
	  @Inject('ITracnnRepository') private readonly repo: ITracnnRepository
  ) {}

  async hello(): Promise<string> {
    return 'Hello';
  }
  
  async execute(input: TracnnDto): Promise<any> {
    return;
  }
}
