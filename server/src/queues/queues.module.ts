import { Module } from '@nestjs/common';
import { QueuesController } from './queues.controller';
import { QueuesService } from './queues.service';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [QueuesController],
  providers: [QueuesService],
})
export class QueuesModule {}
