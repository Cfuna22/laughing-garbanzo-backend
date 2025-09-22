import { Module } from '@nestjs/common';
import { GovernmentService } from './government.service';
import { GovernmentController } from './government.controller';

@Module({
  providers: [GovernmentService],
  controllers: [GovernmentController],
  exports: [GovernmentService],
})
export class GovernmentModule {}
