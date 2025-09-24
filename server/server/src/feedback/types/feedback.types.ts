import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Feedback {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  message: string;

  @Field({ nullable: true })
  rating?: number;

  @Field()
  createdAt: Date;
}

@InputType()
export class CreateFeedbackInput {
  @Field()
  queueId: string;

  @Field()
  userId: string;

  @Field()
  ratings: number;

  @Field({ nullable: true })
  comment?: string;
}
