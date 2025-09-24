import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { CreatePaymentInput } from './create-payment.input';

@ObjectType()
export class UpdatePaymentInput extends PartialType(CreatePaymentInput) {
  @Field({ nullable: true })
  status?: string;
}
