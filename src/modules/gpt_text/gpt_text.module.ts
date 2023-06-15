import { Module } from '@nestjs/common';
import { GptTextService } from './gpt_text.service';
import { GptTextController } from './gpt_text.controller';
import { Openai } from './common/openai';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [GptTextController],
  providers: [GptTextService, Openai],
  imports: [ConfigModule],
  exports: [GptTextModule, Openai],
})
export class GptTextModule {}
