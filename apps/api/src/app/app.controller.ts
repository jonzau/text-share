import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Text } from './texts/text-model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Text {
    return this.appService.getData();
  }
}
