import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class SimulateWebhookInput {
  @Field()
  paymentId: string;

  @Field()
  event: string;

  @Field(() => Float)
  amount: number;

  @Field()
  currency: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  reference?: string;
}
