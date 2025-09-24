import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateFeedbackInput {
  @Field()
  userId: string;

  @Field(() => Int, { nullable: true })
  queueId: number;

  @Field()
  message: string;

  @Field(() => Int, { nullable: true })
  rating?: number;

  @Field( { nullable: true })
  comment?: string;
}

@InputType()
export class UpdateFeedbackInput {
  @Field({ nullable: true })
  message?: string;

  @Field(() => Int, { nullable: true })
  rating?: number;
}
