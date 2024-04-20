import { Test, TestingModule } from '@nestjs/testing';
import { TranscriptsService } from './transcripts.service';

describe('TranscriptsService', () => {
  let service: TranscriptsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranscriptsService],
    }).compile();

    service = module.get<TranscriptsService>(TranscriptsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
