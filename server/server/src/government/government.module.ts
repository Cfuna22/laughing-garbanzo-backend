import { Module } from '@nestjs/common';
import { GovernmentService } from './government.service';
import { GovernmentController } from './government.controller';
import { GovernmentResolver } from './government.resolver';

@Module({
  providers: [GovernmentService, GovernmentResolver],
  controllers: [GovernmentController],
  exports: [GovernmentService],
})
export class GovernmentModule {}
