import { Test, TestingModule } from '@nestjs/testing';
import { QueueEntriesController } from './queue-entries.controller';

describe('QueueEntriesController', () => {
  let controller: QueueEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueEntriesController],
    }).compile();

    controller = module.get<QueueEntriesController>(QueueEntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
