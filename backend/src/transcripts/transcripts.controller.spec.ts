import { Test, TestingModule } from '@nestjs/testing';
import { TranscriptsController } from './transcripts.controller';
import { TranscriptsService } from './transcripts.service';

describe('TranscriptsController', () => {
  let controller: TranscriptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranscriptsController],
      providers: [TranscriptsService],
    }).compile();

    controller = module.get<TranscriptsController>(TranscriptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
