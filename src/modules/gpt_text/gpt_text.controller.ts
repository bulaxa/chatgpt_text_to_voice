import { Controller, Post, Body, Response, UseGuards } from '@nestjs/common';
import { GptTextService } from './gpt_text.service';
import { CreateGptTextDto } from './dto/create-gpt_text.dto';
import { Response as Res } from 'express';
import { AuthGuard } from 'src/config/auth.guard';

@Controller('gpt-text')
export class GptTextController {
  constructor(private readonly gptTextService: GptTextService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createGptTextDto: CreateGptTextDto,
    @Response() res: Res,
  ) {
    const resultData = await this.gptTextService.create(createGptTextDto);
    res.status(resultData.status).send(resultData.data.choices[0].text);
  }
}
