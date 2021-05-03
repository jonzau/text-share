import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController]
    }).compile();
  });

  describe('test', () => {
    it('should return "TextShare server up and running!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.test()).toEqual('TextShare server up and running!');
    });
  });
});
