import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateGptTextDto } from '../dto/create-gpt_text.dto';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class Openai {
  constructor(private configService: ConfigService) {}

  async request(content: CreateGptTextDto): Promise<any> {
    const textData = this.configService.get<any>('OPENAI');

    const configuration = new Configuration({
      apiKey: textData.KEY,
      basePath: textData.PATH,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: content.text,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['Human: ', 'AI: '],
    });

    return response;
  }
}
