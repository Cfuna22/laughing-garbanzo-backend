import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Queue {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  kioskId: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  status: string;

  @Field()
  createdAt: string;
}

@ObjectType()
export class QueueSummary {
  @Field(() => ID)
  EntryId: string;

  @Field(() => ID)
  queueId: string;

  @Field(() => ID)
  userId: string;

  @Field()
  status: string;

  @Field()
  createdAt: Date;
}
