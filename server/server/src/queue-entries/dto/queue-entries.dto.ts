import { Field, InputType } from '@nestjs/graphql';
import { QueuePriority } from '../types/queue-entries.types';

@InputType()
export class CreateQueueEntryInput {
  @Field()
  queueId: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  status?: string;

  @Field(() => QueuePriority, { nullable: true })
  priority?: QueuePriority = QueuePriority.NORMAL;
}

@InputType()
export class UpdateQueueEntryInput {
  @Field({ nullable: true })
  queueId?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  status?: string;

  @Field(() => QueuePriority, { nullable: true })
  priority?: QueuePriority;
}
