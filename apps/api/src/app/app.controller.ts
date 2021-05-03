import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get('test')
  test(): { message: string } {
    return { message: 'TextShare server up and running!' };
  }
}
