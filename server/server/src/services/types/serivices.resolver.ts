import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Service } from './service.model';
import { ServicesService } from '../services.service';
import { CreateServiceInput } from '../dto/create-service.input';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Mutation(() => Service)
  async createService(@Args('data') data: CreateServiceInput) {
    return this.servicesService.create({
      name: data.name,
      kioskId: data.kioskId,
      type: data.type,
      provider: data.provider,
      amount: data.amount,
    });
  }

  @Query(() => [Service])
  async findAll() {
    return this.servicesService.findAll();
  }

  @Query(() => Service, { name: 'service' })
  async findOne(@Args('id') id: number) {
    return this.servicesService.findOne(String(id));
  }

  @Mutation(() => Boolean)
  async removeService(@Args('id') id: number) {
    await this.servicesService.remove(String(id));
    return true;
  }

  @Mutation(() => Boolean)
  async purchaseService(
    @Args('id', { type: () => Int }) id: number,
    @Args('userId', { type: () => Int }) userId: string,
  ) {
    await this.servicesService.purchaseService(String(id), userId);
    return true;
  }
}
