import { Test, TestingModule } from '@nestjs/testing';
import { AiPredictionsService } from './ai-predictions.service';

describe('AiPredictionsService', () => {
  let service: AiPredictionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiPredictionsService],
    }).compile();

    service = module.get<AiPredictionsService>(AiPredictionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
