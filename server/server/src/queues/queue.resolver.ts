import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QueuesService } from './queues.service';
import { Queue, QueueSummary } from './types/queue.types';

@Resolver()
export class QueueResolver {
  constructor(private readonly queueService: QueuesService) {}

  // fetch all data
  @Query(() => [Queue])
  async getQueues() {
    return this.queueService.findAll();
  }

  // fetch a single data
  @Query(() => Queue)
  async getQueue(@Args('id') id: string) {
    return this.queueService.findOne(+id);
  }

  // create a new queue
  @Mutation(() => Queue)
  async createQueue(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('kioskId') kioskId: string,
  ) {
    return this.queueService.create({
      name,
      description,
      kioskId,
    });
  }

  // join a queue
  @Mutation(() => QueueSummary)
  async joinQueue(
    @Args('queueId') queueId: string,
    @Args('userId') userId: string,
  ) {
    return this.queueService.joinQueue(queueId, userId);
  }

  // resume queue
  @Mutation(() => Queue)
  async resumeQueue(@Args('id') id: string) {
    return this.queueService.resumeQueue(id);
  }

  // Serve next in queue
  @Mutation(() => QueueSummary)
  async serveNext(@Args('queueId') queueId: string) {
    return this.queueService.serveNext(queueId);
  }

  // prioritize user
  @Mutation(() => QueueSummary)
  async prioritizeUser(@Args('EntryId') EntryId: string) {
    return this.queueService.prioritizeUser(EntryId);
  }

  // pause queue
  @Mutation(() => QueueSummary)
  async pause(@Args('queueId') queueId: string) {
    return this.queueService.pauseQueue(queueId);
  }

  // update queue
  @Mutation(() => Queue)
  async update(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('description') description: string,
    // @Args('status') status: string,
  ) {
    return this.queueService.update(+id, {
      name,
      description,
      status: 'active',
    });
  }

  // delete
  @Mutation(() => Boolean)
  async remove(@Args('id') id: string) {
    await this.queueService.remove(+id);
    return true;
  }
}
