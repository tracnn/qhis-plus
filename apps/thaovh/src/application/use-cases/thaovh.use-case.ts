import { Inject, Injectable } from '@nestjs/common';
import { IThaovhUseCase } from '../ports/inbound/thaovh.usecase.interface';
import { IThaovhRepository } from '../ports/outbound/thaovh.repository.interface';
import { Thaovh } from '../../domain/entities/thaovh.entity';
import { ThaovhDto } from '../dtos/thaovh.dto';

@Injectable()
export class ThaovhUseCase implements IThaovhUseCase {
  constructor(
	@Inject('IThaovhRepository')
	private readonly repo: IThaovhRepository
  ) {}

  async hello(): Promise<string> {
    return 'Hello';
  }
  
  async execute(input: ThaovhDto): Promise<any> {
    return;
  }
}
