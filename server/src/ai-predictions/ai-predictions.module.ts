import { Module } from '@nestjs/common';
import { AiPredictionsService } from './ai-predictions.service';
import { AiPredictionsController } from './ai-predictions.controller';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AiPredictionsService],
  controllers: [AiPredictionsController],
})
export class AiPredictionsModule {}
