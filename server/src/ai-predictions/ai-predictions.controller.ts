import { Controller, Get, Param, Query } from '@nestjs/common';
import { AiPredictionsService } from './ai-predictions.service';

@Controller('ai-predictions')
export class AiPredictionsController {
  constructor(private readonly aiPredictionsService: AiPredictionsService) {}

  // GET /ai-predictions/:queueId/average
  @Get(':queueId/average')
  async getAverageWait(@Param('queueId') queueId: string) {
    return this.aiPredictionsService.predictAverageWaitTime(queueId);
  }

  // GET /ai-predictions/:queueId/estimate?queueSize=5
  @Get(':queueId/estimate')
  async getUserWaitEstimate(
    @Param('queueId') queueId: string,
    @Query('queueSize') queueSize: string,
  ) {
    const size = parseInt(queueSize, 10) || 1;
    return this.aiPredictionsService.predictUserWaitTime(queueId, size);
  }
}
