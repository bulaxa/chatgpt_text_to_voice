import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateGptTextDto } from '../dto/create-gpt_text.dto';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class Openai {
  constructor(private configService: ConfigService) {}

  async request(content: CreateGptTextDto): Promise<any> {
    const envData = this.configService.get<any>('OPENAI');
    try {
      const configuration = new Configuration({
        apiKey: envData.KEY,
        basePath: envData.PATH,
      });

      const response = await this.gptResultText(configuration, content.text);
      return response;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  private async gptResultText(configuration: Configuration, text: string) {
    const openai = new OpenAIApi(configuration);
    return await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['Human: ', 'AI: '],
    });
  }
}
