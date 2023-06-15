import { Injectable } from '@nestjs/common';
import { CreateGptVoiceDto } from './dto/create-gpt_voice.dto';
import { UpdateGptVoiceDto } from './dto/update-gpt_voice.dto';
import { Elevenlabs } from './common/elevenlabs';
import { Openai } from '../gpt_text/common/openai';

@Injectable()
export class GptVoiceService {
  constructor(private elevenlabs: Elevenlabs, private openai: Openai) {}

  async create(createGptVoiceDto: CreateGptVoiceDto) {
    const text_response = await this.openai.request(createGptVoiceDto);
    const voice_request = await this.elevenlabs.request(
      text_response.data.choices[0],
    );

    //const voice_request = await this.elevenlabs.request(createGptVoiceDto);

    return voice_request;
  }

  findAll() {
    return `This action returns all gptVoice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gptVoice`;
  }

  update(id: number, updateGptVoiceDto: UpdateGptVoiceDto) {
    return `This action updates a #${id} gptVoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} gptVoice`;
  }
}
