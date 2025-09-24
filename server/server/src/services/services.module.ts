import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { DatabaseModule } from '../db/database.module';
import { PaymentsModule } from '../payments/payments.module';
import { ServiceResolver } from './types/serivices.resolver';

@Module({
  imports: [DatabaseModule, PaymentsModule],
  providers: [ServicesService, ServiceResolver],
  controllers: [ServicesController],
})
export class ServicesModule {}
