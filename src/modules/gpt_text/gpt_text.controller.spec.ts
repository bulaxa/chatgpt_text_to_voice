import { Test, TestingModule } from '@nestjs/testing';
import { GptTextController } from './gpt_text.controller';
import { GptTextService } from './gpt_text.service';

describe('GptTextController', () => {
  let controller: GptTextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GptTextController],
      providers: [GptTextService],
    }).compile();

    controller = module.get<GptTextController>(GptTextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
