import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SelfServiceService } from '../self-service.service';
import { QueuePosition } from './queue-position.model';
import { QueueHistory } from './queue-history.model';

@Resolver()
export class selfServiceResolver {
  constructor(private readonly selfService: SelfServiceService) {}

  @Query(() => QueuePosition)
  async getPosition(
    @Args('userId', { type: () => String }) userId: string,
    @Args('queueId', { type: () => String }) queueId: string,
  ) {
    return this.selfService.getMyPosition(userId, queueId);
  }

  @Mutation(() => Boolean)
  async cancelEntry(
    @Args('entryId') entryId: string,
  ) {
    await this.selfService.cancelEntry({ entryId });
    return true;
  }

  @Mutation(() => Boolean)
  async rejoinQueue(
    @Args('userId') userId: string,
    @Args('queueId') queueId: string,
  ) {
    await this.selfService.rejoinQueue({ userId, queueId });
    return true;
   }

  @Query(() => [QueueHistory])
  async getHistory(@Args('userId', { type: () => String }) userId: string) {
    return this.selfService.myHistory(userId);
  }
}
