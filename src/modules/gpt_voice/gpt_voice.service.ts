import { Injectable } from '@nestjs/common';
import { CreateGptVoiceDto } from './dto/create-gpt_voice.dto';
import { Elevenlabs } from './common/elevenlabs';
import { Openai } from '../gpt_text/common/openai';

@Injectable()
export class GptVoiceService {
  constructor(private elevenlabs: Elevenlabs, private openai: Openai) {}

  async create(createGptVoiceDto: CreateGptVoiceDto) {
    try {
      const textResponse = await this.openai.request(createGptVoiceDto);
      const voiceRequest = await this.elevenlabs.request(
        textResponse.data.choices[0],
      );

      return voiceRequest;
    } catch (error) {
      console.log(error);
    }
  }
}
