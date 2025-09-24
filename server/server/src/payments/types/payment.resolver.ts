import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PaymentsService } from '../payments.service';
import { Payment } from './payment.model';
import { CreatePaymentInput } from '../dto/create-payment.input';
import { SimulateWebhookInput } from '../dto/simulate-webhook.input';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentsService) {}

  @Query(() => Payment, { nullable: true })
  async payment(@Args('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Mutation(() => Payment)
  async createPayment(@Args('input') input: CreatePaymentInput) {
    return this.paymentService.create(input);
  }

  @Mutation(() => Payment)
  async updatePayment(
    @Args('id') id: string,
    @Args('input') input: CreatePaymentInput,
  ) {
    return this.paymentService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deletePayment(@Args('id') id: string) {
    await this.paymentService.remove(id);
    return true;
  }

  @Mutation(() => Boolean)
  async markPaymentSuccess(
    @Args('id') id: string,
    @Args('reference') reference: string,
  ) {
    await this.paymentService.markAsSuccessful(id, reference);
    return true;
  }

  @Mutation(() => Boolean)
  async markPaymentFail(@Args('id') id: string) {
    await this.paymentService.markAsFailed(id);
    return true;
  }

  @Mutation(() => Payment)
  simulateWebhook(@Args('input') input: SimulateWebhookInput) {
    return this.paymentService.handleWebhook(input);
  }
}
