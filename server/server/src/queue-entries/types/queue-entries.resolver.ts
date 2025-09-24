import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QueueEntriesService } from '../queue-entries.service';
import { QueueEntry } from '../types/queue-entries.types';
import {
  CreateQueueEntryInput,
  UpdateQueueEntryInput,
} from '../dto/queue-entries.dto';

@Resolver(() => QueueEntry)
export class QueueEntriesResolver {
  constructor(private readonly queueEntriesService: QueueEntriesService) {}

  @Query(() => [QueueEntry])
  async queueEntries() {
    return this.queueEntriesService.findAll();
  }

  @Query(() => QueueEntry, { nullable: true })
  async queueEntry(@Args('id') id: string) {
    return this.queueEntriesService.findOne(+id);
  }

  @Query(() => [QueueEntry])
  async queueEntriesByQueue(@Args('queueId') queueId: string) {
    return this.queueEntriesService.findAllByQueue(queueId);
  }

  @Mutation(() => QueueEntry)
  async createQueueEntry(@Args('input') input: CreateQueueEntryInput) {
    return this.queueEntriesService.create(input);
  }

  @Mutation(() => QueueEntry)
  async joinQueue(
    @Args('queueId') queueId: string,
    @Args('userId') userId: string,
    @Args('priority', { nullable: true }) priority: 'vip' | 'staff' | 'normal',
  ) {
    return this.queueEntriesService.joinQueue(queueId, userId, priority);
  }

  @Mutation(() => QueueEntry, { nullable: true })
  async updateQueueEntry(
    @Args('id') id: string,
    @Args('input') input: UpdateQueueEntryInput,
  ) {
    return this.queueEntriesService.update(+id, input);
  }

  @Mutation(() => QueueEntry, { nullable: true })
  async removeQueueEntry(@Args('id') id: string) {
    return this.queueEntriesService.remove(+id);
  }

  @Mutation(() => QueueEntry, { nullable: true })
  async getNextQueueEntry(@Args('queueId') queueId: string) {
    return this.queueEntriesService.getNext(queueId);
  }

  @Mutation(() => Boolean)
  async pauseQueue(@Args('queueId') queueId: string) {
    await this.queueEntriesService.pauseQueue(queueId);
    return true;
  }

  @Mutation(() => Boolean)
  async resumeQueue(@Args('queueId') queueId: string) {
    await this.queueEntriesService.resumeQueue(queueId);
    return true;
  }
}
