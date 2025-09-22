import { Args, Query, Resolver } from '@nestjs/graphql';
import { GovernmentService } from './government.service';
import {
  CACResponse,
  NINResponse,
  PhoneResponse,
  TINResponse,
} from './types/government.types';

@Resolver()
export class GovernmentResolver {
  constructor(private readonly govService: GovernmentService) {}

  @Query(() => CACResponse)
  async verifyCAC(@Args('cacNumber') cacNumber: string) {
    return this.govService.verifyCAC(cacNumber);
  }

  @Query(() => NINResponse)
  async verifyNIN(@Args('nin') nin: string) {
    return this.govService.verifyNIN(nin);
  }

  @Query(() => TINResponse)
  async verifyTIN(@Args('tin') tin: string) {
    return this.govService.verifyTIN(tin);
  }

  @Query(() => PhoneResponse)
  async verifyPhone(@Args('phone') phone: string) {
    return this.govService.verifyPhone(phone);
  }
}
