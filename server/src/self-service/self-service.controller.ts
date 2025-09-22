import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { SelfServiceService } from './self-service.service';
import { CancelEntryDto } from './dto/cancel-queue.dto';
import { RejoinQueueDto } from './dto/rejoin-queue.dto';

@Controller('self-service')
export class SelfServiceController {
  constructor(private readonly selService: SelfServiceService) {}

  @Get('position/:userId/:queueId')
  getMyPosition(
    @Param('userId') userId: string,
    @Param('queueId') queueId: string,
  ) {
    return this.selService.getMyPosition(userId, queueId);
  }

  @Post('cancel')
  cancelEntry(@Body() dto: CancelEntryDto) {
    return this.selService.cancelEntry(dto);
  }

  @Post('rejoin')
  rejoinQueue(@Body() dto: RejoinQueueDto) {
    return this.selService.rejoinQueue(dto);
  }

  @Get('history/:userId')
  myHistory(@Param('userId') userId: string) {
    return this.selService.myHistory(userId);
  }
}
