import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateGptVoiceDto } from '../dto/create-gpt_voice.dto';
//import * as fs from 'fs';

@Injectable()
export class Elevenlabs {
  private envData;
  constructor(private configService: ConfigService) {
    this.envData = this.configService.get<any>('VOICE');
  }

  async request(content: CreateGptVoiceDto): Promise<any> {
    const urlCreateVoice =
      this.envData.PATH +
      this.envData.POST +
      '21m00Tcm4TlvDq8ikWAM?optimize_streaming_latency=0';
    try {
      const response = await this.gtpResultVoice(urlCreateVoice, content.text);
      const audioBase64 = await this.generateAudioBase64(response);

      if (response.status != HttpStatus.OK) {
        return {
          statusCode: response.statusText,
          data: null,
        };
      }

      return {
        statusCode: response.statusText,
        data: audioBase64,
      };
    } catch (error) {
      console.log(error);
    }
  }

  private async gtpResultVoice(
    urlCreateVoice: string,
    text: string,
  ): Promise<any> {
    return await fetch(urlCreateVoice, {
      method: 'POST',
      headers: {
        accept: 'audio/mpeg',
        'content-type': 'application/json',
        'xi-api-key': this.envData.KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v1',
        voice_settings: {
          stability: 0,
          similarity_boost: 0,
        },
      }),
    });
  }

  private async generateAudioBase64(response: any) {
    try {
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      //teste de arquivo
      //const fileName = './voices/voice.mp3';
      //fs.writeFileSync(fileName, buffer);
      ///

      return buffer.toString('base64');
    } catch (error) {
      console.log(error);
    }
  }
}
