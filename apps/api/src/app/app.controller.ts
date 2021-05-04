import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('test')
  test(): string {
    return 'TextShare server up and running!';
  }
}
