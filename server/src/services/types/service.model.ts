import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Service {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;
}
