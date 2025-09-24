import { Field, ID, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string;

  @Field()
  to: string;

  @Field()
  userId: string;

  @Field()
  message: string;

  @Field()
  type: string;

  @Field()
  isRead: boolean;

  @Field()
  createdAt: Date;
}

@InputType()
export class UpdateNotificationInput {
  @Field({ nullable: true })
  to?: string;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  userId?: string;
}
