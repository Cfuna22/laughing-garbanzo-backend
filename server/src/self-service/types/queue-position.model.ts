import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QueuePosition {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  queueId: number;

  @Field(() => Int)
  position: number;
}
