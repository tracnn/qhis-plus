import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ThaovhDto } from '../../application/dtos/thaovh.dto';
import { IThaovhUseCase } from '../../application/ports/inbound/thaovh.usecase.interface';

@Controller('thaovh')
export class ThaovhController {
  constructor(
	@Inject('IThaovhUseCase')
	private readonly useCase: IThaovhUseCase
  ) {}

  @Get()
  async hello(@Body() dto: ThaovhDto) {
    return await this.useCase.hello();
  }
}
