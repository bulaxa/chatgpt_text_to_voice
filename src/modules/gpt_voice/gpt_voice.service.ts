import { Injectable } from '@nestjs/common';
import { CreateGptVoiceDto } from './dto/create-gpt_voice.dto';
import { Elevenlabs } from './common/elevenlabs';
import { Openai } from '../gpt_text/common/openai';

@Injectable()
export class GptVoiceService {
  constructor(private elevenlabs: Elevenlabs, private openai: Openai) {}

  async create(createGptVoiceDto: CreateGptVoiceDto) {
    try {
      const text_response = await this.openai.request(createGptVoiceDto);
      const voice_request = await this.elevenlabs.request(
        text_response.data.choices[0],
      );

      return voice_request;
    } catch (error) {
      console.log(error);
    }
  }
}
