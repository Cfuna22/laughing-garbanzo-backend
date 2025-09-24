import { Test, TestingModule } from '@nestjs/testing';
import { SelfServiceController } from './self-service.controller';

describe('SelfServiceController', () => {
  let controller: SelfServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelfServiceController],
    }).compile();

    controller = module.get<SelfServiceController>(SelfServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
