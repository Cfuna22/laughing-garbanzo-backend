import { Args, Query, Resolver } from '@nestjs/graphql';
import { AiPredictionsService } from '../ai-predictions.service';
import { AverageWaitTime, UserWaitTime } from './ai-prediction.types';

@Resolver()
export class AiPredictionsResolver {
  constructor(private readonly aiService: AiPredictionsService) {}

  @Query(() => AverageWaitTime)
  async predictAverageWaitTime(@Args('queueId') queueId: string) {
    return this.aiService.predictAverageWaitTime(queueId);
  }

  @Query(() => UserWaitTime)
  async predictUserWaitTime(
    @Args('queueId') queueId: string,
    @Args('currentQueueSize') currentQueueSize: number,
  ) {
    return this.aiService.predictUserWaitTime(queueId, currentQueueSize);
  }
}
