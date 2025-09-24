import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { KioskType } from './types/kiosk.type';
import { CreateKioskInput, UpdateKioskInput } from './dto/kiosk.input';
import { CreateKioskDto } from './dto/create-kiosk.dto';
import { UpdateKioskDto } from './dto/update-kiosk.dto';
import { KioskService } from './kiosk.service';

@Resolver(() => KioskType)
export class KioskResolver {
  constructor(private readonly kioskService: KioskService) {}

  @Query(() => [KioskType])
  async kiosks() {
    return this.kioskService.findAll();
  }

  @Query(() => KioskType, { nullable: true })
  async kiosk(@Args('id') id: string) {
    return this.kioskService.findOne(+id);
  }

  @Mutation(() => KioskType)
  async createKiosk(@Args('data') data: CreateKioskInput) {
    const dto: CreateKioskDto = { ...data }; // Map GraphQL input → DTO
    return this.kioskService.create(dto);
  }

  @Mutation(() => KioskType, { nullable: true })
  async updateKiosk(
    @Args('id') id: string,
    @Args('data') data: UpdateKioskInput,
  ) {
    const dto: UpdateKioskDto = { ...data }; // Map GraphQL input → DTO
    return this.kioskService.update(+id, dto);
  }

  @Mutation(() => KioskType, { nullable: true })
  async deleteKiosk(@Args('id') id: string) {
    return this.kioskService.remove(+id);
  }
}
