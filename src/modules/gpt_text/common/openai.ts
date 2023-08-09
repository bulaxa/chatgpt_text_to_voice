import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateGptTextDto } from '../dto/create-gpt_text.dto';
import { Configuration, OpenAIApi } from 'openai';
import IApiInterface from 'src/interfaces/IApi.interface';

@Injectable()
export class Openai implements IApiInterface {
  constructor(private configService: ConfigService) {}

  async request(content: CreateGptTextDto): Promise<any> {
    const envData = this.configService.get<any>('OPENAI');
    try {
      const configuration = new Configuration({
        apiKey: envData.KEY,
        basePath: envData.PATH,
      });

      const response = await this.gptResultText(configuration, content.text);
      if (response.data) {
        return response;
      }
      throw new HttpException(response.data, 400);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  private async gptResultText(configuration: Configuration, text: string) {
    const openai = new OpenAIApi(configuration);
    return await openai
      .createCompletion({
        model: 'text-davinci-003',
        prompt: text,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['Human: ', 'AI: '],
      })
      .catch((error) => {
        console.log(error.response.data);
        throw new HttpException(
          error.response.statusText,
          error.response.status,
          {
            cause: error.response.data.error.message,
          },
        );
      });
  }
}
