import { Injectable } from '@nestjs/common';
import { CreateGptTextDto } from './dto/create-gpt_text.dto';
import { UpdateGptTextDto } from './dto/update-gpt_text.dto';
import { Openai } from './common/openai';

@Injectable()
export class GptTextService {
  constructor(private openai: Openai) {}

  async create(createGptTextDto: CreateGptTextDto) {
    const text_response = await this.openai.request(createGptTextDto);
    return text_response;
  }

  findAll() {
    return `This action returns all gptText`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gptText`;
  }

  update(id: number, updateGptTextDto: UpdateGptTextDto) {
    return `This action updates a #${id} gptText`;
  }

  remove(id: number) {
    return `This action removes a #${id} gptText`;
  }
}
