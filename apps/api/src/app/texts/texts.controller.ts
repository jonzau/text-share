import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTextDto } from './dto/create-text.dto';
import { Text } from './text-model';
import { TextsService } from './texts.service';

@Controller('texts')
export class TextsController {

  constructor(private readonly textsService: TextsService) {}

  @Get()
  findAll(): Promise<Text[]> {
    return this.textsService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id): Promise<Text> {
    return this.textsService.findOne(id);
  }

  @Post()
  createItem(@Body() createText: CreateTextDto): Promise<Text> {  // TODO: see if 'CreateTextDto' can be replaced with 'Text' (also for update)
    return this.textsService.create(createText);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Text> {
    return this.textsService.delete(id);
  }
  
  @Put(':id')
  update(@Body() updateIText: CreateTextDto, @Param('id') id): Promise<Text> {
    return this.textsService.update(id, updateIText);
  }
}
