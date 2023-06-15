import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
} from '@nestjs/common';
import { GptVoiceService } from './gpt_voice.service';
import { UpdateGptVoiceDto } from './dto/update-gpt_voice.dto';
import { CreateGptVoiceDto } from './dto/create-gpt_voice.dto';
import type { Response } from 'express';
import { HttpStatusCode } from 'axios';

@Controller('gpt-voice')
export class GptVoiceController {
  constructor(private readonly gptVoiceService: GptVoiceService) {}

  @Post()
  async create(
    @Body() createGptVoiceDto: CreateGptVoiceDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const resultData = await this.gptVoiceService.create(createGptVoiceDto);

    res.status(HttpStatusCode.Ok).send(resultData.data);
  }

  @Get()
  findAll() {
    return this.gptVoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gptVoiceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGptVoiceDto: UpdateGptVoiceDto,
  ) {
    return this.gptVoiceService.update(+id, updateGptVoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gptVoiceService.remove(+id);
  }
}
