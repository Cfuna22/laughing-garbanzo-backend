import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum QueuePriority {
  VIP = 'vip',
  STAFF = 'staff',
  NORMAL = 'normal',
}

registerEnumType(QueuePriority, {
  name: 'QueuePriority',
});

@ObjectType()
export class QueueEntry {
  @Field(() => ID)
  id: string;

  @Field()
  queueId: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  status?: string;

  @Field(() => QueuePriority)
  priority: QueuePriority;

  @Field(() => Date, { nullable: true })
  joinedAt?: Date;

  @Field(() => Date, { nullable: true })
  servedAt?: Date;
}
