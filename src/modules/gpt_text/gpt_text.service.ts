import { Injectable } from '@nestjs/common';
import { CreateGptTextDto } from './dto/create-gpt_text.dto';
import { Openai } from './common/openai';

@Injectable()
export class GptTextService {
  constructor(private openai: Openai) {}

  async create(createGptTextDto: CreateGptTextDto) {
    const textResponse = await this.openai.request(createGptTextDto);
    return textResponse;
  }
}
