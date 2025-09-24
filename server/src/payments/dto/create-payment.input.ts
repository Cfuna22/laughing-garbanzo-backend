import { Field, InputType, Int } from '@nestjs/graphql';
import { PaymentProvider } from '../payment.providers';

@InputType()
export class CreatePaymentInput {
  @Field()
  userId: string;

  @Field()
  serviceId: string;

  @Field(() => Int)
  amount: number;

  // @Field()
  // provider: string;

  @Field()
  email: string;

  @Field()
  provider?: PaymentProvider;

  @Field()
  phone?: number;

  @Field()
  customerName: string;
}
