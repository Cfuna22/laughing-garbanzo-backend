import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QueueHistory {
  @Field(() => Int)
  queueId: number;

  @Field()
  status: string;

  @Field()
  joinedAt: string;

  @Field({ nullable: true })
  leftAt: string;
}
