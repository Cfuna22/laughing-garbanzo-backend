import { Module } from '@nestjs/common';
import { AiPredictionsService } from './ai-predictions.service';
import { AiPredictionsController } from './ai-predictions.controller';
import { DatabaseModule } from 'src/db/database.module';
import { AiPredictionsResolver } from './types/ai-prediction.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [AiPredictionsService, AiPredictionsResolver],
  controllers: [AiPredictionsController],
})
export class AiPredictionsModule {}
