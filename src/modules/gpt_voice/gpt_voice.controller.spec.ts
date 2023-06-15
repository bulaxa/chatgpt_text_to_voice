import { Test, TestingModule } from '@nestjs/testing';
import { GptVoiceController } from './gpt_voice.controller';
import { GptVoiceService } from './gpt_voice.service';

describe('GptVoiceController', () => {
  let controller: GptVoiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GptVoiceController],
      providers: [GptVoiceService],
    }).compile();

    controller = module.get<GptVoiceController>(GptVoiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
