import { Module } from '@nestjs/common';
import { QueueEntriesController } from './queue-entries.controller';
import { QueueEntriesService } from './queue-entries.service';
import { DatabaseModule } from 'src/db/database.module';
import { QueueEntriesResolver } from './types/queue-entries.resolver';

@Module({
  imports: [DatabaseModule],
  controllers: [QueueEntriesController],
  providers: [QueueEntriesService, QueueEntriesResolver],
})
export class QueueEntriesModule {}
