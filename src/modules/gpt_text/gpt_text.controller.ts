import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
} from '@nestjs/common';
import { GptTextService } from './gpt_text.service';
import { CreateGptTextDto } from './dto/create-gpt_text.dto';
import { UpdateGptTextDto } from './dto/update-gpt_text.dto';
import { Response as Res } from 'express';

@Controller('gpt-text')
export class GptTextController {
  constructor(private readonly gptTextService: GptTextService) {}

  @Post()
  async create(
    @Body() createGptTextDto: CreateGptTextDto,
    @Response() res: Res,
  ) {
    const resultData = await this.gptTextService.create(createGptTextDto);
    res.status(resultData.status).send(resultData.data.choices[0].text);
  }

  @Get()
  findAll() {
    return this.gptTextService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gptTextService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGptTextDto: UpdateGptTextDto) {
    return this.gptTextService.update(+id, updateGptTextDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gptTextService.remove(+id);
  }
}
