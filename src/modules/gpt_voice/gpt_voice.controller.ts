import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { GptVoiceService } from './gpt_voice.service';
import { CreateGptVoiceDto } from './dto/create-gpt_voice.dto';
import type { Response } from 'express';
import { AuthGuard } from '../../config/auth.guard';

@Controller('gpt-voice')
export class GptVoiceController {
  constructor(private readonly gptVoiceService: GptVoiceService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createGptVoiceDto: CreateGptVoiceDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resultData = await this.gptVoiceService.create(createGptVoiceDto);
    res.set({
      'Content-Type': 'application/json',
    });
    res.send(resultData);
  }
}
