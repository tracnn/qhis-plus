import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { TracnnDto } from '../../application/dtos/tracnn.dto';
import { ITracnnUseCase } from '../../application/ports/inbound/tracnn.usecase.interface';

@Controller('tracnn')
export class TracnnController {
  constructor(
	@Inject('ITracnnUseCase')
	private readonly useCase: ITracnnUseCase
  ) {}

  @Get()
  async hello(@Body() dto: TracnnDto) {
    return await this.useCase.hello();
  }
}
