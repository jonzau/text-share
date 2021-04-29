import { Injectable } from '@nestjs/common';
import { Text } from './texts/text-model';

@Injectable()
export class AppService {

  private readonly cachedTexts = [];

  getData(): Text {
    return { text: 'Welcome to api!' };
  }
}
