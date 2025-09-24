import { Test, TestingModule } from '@nestjs/testing';
import { SelfServiceService } from './self-service.service';

describe('SelfServiceService', () => {
  let service: SelfServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelfServiceService],
    }).compile();

    service = module.get<SelfServiceService>(SelfServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
