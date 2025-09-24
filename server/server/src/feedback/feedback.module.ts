import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { DatabaseModule } from 'src/db/database.module';
import { FeedbackResolver } from './types/feedback.Resolver';

@Module({
  imports: [DatabaseModule],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackResolver],
})
export class FeedbackModule {}
