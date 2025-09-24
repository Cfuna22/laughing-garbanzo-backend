import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
  @Field()
  name: string;

  @Field()
  kioskId: string;

  @Field(() => String)
  type:  "airtime" | "data" | "bill";

  @Field()
  provider: string;

  @Field(() => Float)
  amount: number;
}
