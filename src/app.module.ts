import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GptTextModule } from './modules/gpt_text/gpt_text.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GptVoiceModule } from './modules/gpt_voice/gpt_voice.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    GptTextModule,
    HttpModule,
    GptVoiceModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
