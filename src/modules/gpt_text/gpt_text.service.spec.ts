import { Test, TestingModule } from '@nestjs/testing';
import { GptTextService } from './gpt_text.service';

describe('GptTextService', () => {
  let service: GptTextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GptTextService],
    }).compile();

    service = module.get<GptTextService>(GptTextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
