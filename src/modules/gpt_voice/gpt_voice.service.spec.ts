import { Test, TestingModule } from '@nestjs/testing';
import { GptVoiceService } from './gpt_voice.service';

describe('GptVoiceService', () => {
  let service: GptVoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GptVoiceService],
    }).compile();

    service = module.get<GptVoiceService>(GptVoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
