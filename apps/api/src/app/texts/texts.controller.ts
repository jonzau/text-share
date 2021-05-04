import { Body, Controller, Delete, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { TextsService } from './texts.service';
import { CreateTextDto, TextDto } from '@text-share/api-interfaces';
import { TextDocument } from './schemas/text.schema';

@Controller('texts')
export class TextsController {

  constructor(private readonly textsService: TextsService) {}

  // TODO: Remove. For development.
  @Get()
  retrieveAll(): Promise<TextDocument[]> {
    return this.textsService.findAll();
  }

  @Get(':id')
  retrieveText(@Headers('pw') password: string, @Param('id') id): Promise<TextDto> {
    return this.textsService.findOne(id, password);
  }

  @Post()
  createText(@Body() createText: CreateTextDto): Promise<TextDto> {
    return this.textsService.create(createText);
  }

  @Delete(':id')
  deleteText(@Headers('pw') password: string, @Param('id') id): Promise<TextDto> {
    return this.textsService.delete(id, password);
  }
  
  @Put(':id')
  updateText(@Body() updateText: CreateTextDto, @Headers('pw') password: string, @Param('id') id): Promise<TextDto> {
    return this.textsService.update(id, updateText, password);
  }
}
