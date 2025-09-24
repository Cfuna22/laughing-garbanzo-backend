import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Payment {
  @Field(() => Int)
  id: number;

  @Field()
  reference: string;

  @Field(() => Float)
  amount: number;

  @Field()
  currency: string;

  @Field()
  status: string;

  @Field()
  createdAt: string;

  @Field({ nullable: true })
  updatedAt?: string;
}
