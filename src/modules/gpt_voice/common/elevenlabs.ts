import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateGptVoiceDto } from '../dto/create-gpt_voice.dto';
import * as fs from 'fs';

@Injectable()
export class Elevenlabs {
  constructor(private configService: ConfigService) {}

  async request(content: CreateGptVoiceDto): Promise<any> {
    const voiceData = this.configService.get<any>('VOICE');

    const urlCreateVoice =
      voiceData.PATH +
      voiceData.POST +
      '21m00Tcm4TlvDq8ikWAM?optimize_streaming_latency=0';
    try {
      const response = await fetch(urlCreateVoice, {
        method: 'POST',
        headers: {
          accept: 'audio/mpeg',
          'content-type': 'application/json',
          'xi-api-key': voiceData.KEY,
        },
        body: JSON.stringify({
          text: content.text,
          model_id: 'eleven_multilingual_v1',
          voice_settings: {
            stability: 0,
            similarity_boost: 0,
          },
        }),
      });

      if (response.status != HttpStatus.OK) {
        return {
          arquivo: null,
          status: response.statusText,
          data: null,
        };
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = './voices/voice.mp3';
      fs.writeFileSync(fileName, buffer);
      return {
        arquivo: fileName,
        status: response.statusText,
        data: buffer.toString('base64'),
      };
    } catch (error) {
      console.log(error);
    }
  }
}
