import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { KioskService } from './kiosk.service';
import { KioskType } from './types/kiosk.type';
import { CreateKioskDto } from './dto/create-kiosk.dto';
import { UpdateKioskDto } from './dto/update-kiosk.dto';

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
  async createKiosk(@Args('data') data: CreateKioskDto) {
    return this.kioskService.create(data);
  }

  @Mutation(() => KioskType, { nullable: true })
  async updateKiosk(
    @Args('id') id: string,
    @Args('data') data: UpdateKioskDto,
  ) {
    return this.kioskService.update(+id, data);
  }

  @Mutation(() => KioskType, { nullable: true })
  async deleteKiosk(@Args('id') id: string) {
    return this.kioskService.remove(+id);
  }
}
