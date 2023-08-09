import { HttpException, Injectable } from '@nestjs/common';
import { CreateGptTextDto } from './dto/create-gpt_text.dto';
import { Openai } from './common/openai';

@Injectable()
export class GptTextService {
  constructor(private openai: Openai) {}

  async create(createGptTextDto: CreateGptTextDto) {
    try {
      const textResponse = await this.openai.request(createGptTextDto);
      return textResponse;
    } catch (error) {
      throw new HttpException(error.response, error.status, {
        cause: error.response,
      });
    }
  }
}
