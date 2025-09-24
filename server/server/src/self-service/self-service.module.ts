import { Module } from '@nestjs/common';
import { SelfServiceController } from './self-service.controller';
import { SelfServiceService } from './self-service.service';
import { DatabaseModule } from 'src/db/database.module';
import { selfServiceResolver } from './types/self-service.resolver';

@Module({
  imports: [DatabaseModule],
  controllers: [SelfServiceController],
  providers: [SelfServiceService, selfServiceResolver],
})
export class SelfServiceModule {}
