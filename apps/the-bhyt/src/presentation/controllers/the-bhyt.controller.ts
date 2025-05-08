import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TheBhytUseCase } from '../../application/use-cases/the-bhyt.use-case';
import { CheckTheBhytDto } from '../../application/dtos/check-the-bhyt.dto';

@ApiTags('BHYT')
@Controller('the-bhyt')
export class TheBhytController {
  constructor(
    @Inject('ITheBhytUseCase')
    private readonly theBhytUseCase: TheBhytUseCase,
  ) {}

  @Post('check')
  @ApiOperation({ summary: 'Kiểm tra thông tin thẻ BHYT' })
  @ApiResponse({ status: 200, description: 'Kiểm tra thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  async checkTheBhyt(@Body() params: CheckTheBhytDto) {
    return this.theBhytUseCase.checkTheBhyt(params);
  }
}
