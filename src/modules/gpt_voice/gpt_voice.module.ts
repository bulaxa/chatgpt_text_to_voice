import { Module } from '@nestjs/common';
import { GptVoiceService } from './gpt_voice.service';
import { GptVoiceController } from './gpt_voice.controller';
import { Elevenlabs } from './common/elevenlabs';
import { ConfigModule } from '@nestjs/config';
import { GptTextModule } from '../gpt_text/gpt_text.module';

@Module({
  controllers: [GptVoiceController],
  providers: [GptVoiceService, Elevenlabs],
  imports: [ConfigModule, GptTextModule],
})
export class GptVoiceModule {}
