import { Test, TestingModule } from '@nestjs/testing';
import { AiPredictionsController } from './ai-predictions.controller';

describe('AiPredictionsController', () => {
  let controller: AiPredictionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiPredictionsController],
    }).compile();

    controller = module.get<AiPredictionsController>(AiPredictionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
