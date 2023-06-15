import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
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

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFile('/voices/voice.mp3', buffer, (file) => {
      console.log(file);
    });
    return JSON.stringify({
      arquivo: 'voice.mp3',
      status: 'OK',
    });
  }
}
