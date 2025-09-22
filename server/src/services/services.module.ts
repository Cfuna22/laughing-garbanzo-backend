import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { DatabaseModule} from '../db/database.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [DatabaseModule, PaymentsModule],
  providers: [ServicesService],
  controllers: [ServicesController]
})
export class ServicesModule {}
