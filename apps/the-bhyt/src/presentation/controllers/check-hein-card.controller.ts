import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CheckHeinCardQueryService } from '../../application/services/check-hein-card-query.service';
import { GetCheckHeinCardsDto } from '../../application/dtos/get-check-hein-cards.dto';

@ApiTags('the-bhyt')
@Controller('the-bhyt')
export class CheckHeinCardController {
  constructor(private readonly checkHeinCardQueryService: CheckHeinCardQueryService) {}

  @Get('check-hein-cards')
  @ApiOperation({ summary: 'Lấy danh sách thẻ BHYT theo điều kiện' })
  @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
  async getCheckHeinCards(@Query() query: GetCheckHeinCardsDto) {
    return this.checkHeinCardQueryService.getCheckHeinCards(query);
  }
} 