import { Test, TestingModule } from '@nestjs/testing';
import { CreateTextDto } from '@text-share/api-interfaces';
import { TextsController } from "./texts.controller";
import { TextsService } from './texts.service';

class TextsServiceMock {
  findOne = jest.fn();
  create = jest.fn();
  delete = jest.fn();
  update = jest.fn();
}

describe('TextsController', () => {
  let controller: TextsController;
  let textsServiceMock: TextsServiceMock;

  beforeEach(async () => {
    textsServiceMock = new TextsServiceMock();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextsController],
      providers: [{
        provide: TextsService,
        useValue: textsServiceMock
      }]
    }).compile();

    controller = module.get<TextsController>(TextsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should retrieveText', () => {
    const id = '123';
    const pw = '456';

    controller.retrieveText(pw, id);
    expect(textsServiceMock.findOne).toHaveBeenCalledWith(id, pw);
  });

  it('should createText', () => {
    const textToCreate: CreateTextDto = {
      text: 'test text',
      readPassword: '123',
      editPassword: '456'
    };

    controller.createText(textToCreate);
    expect(textsServiceMock.create).toHaveBeenCalledWith(textToCreate);
  });

  it('should deleteText', () => {
    const id = '123';
    const pw = '456';

    controller.deleteText(pw, id);
    expect(textsServiceMock.delete).toHaveBeenCalledWith(id, pw);
  });

  it('should updateText', () => {
    const id = '123';
    const pw = '456';
    const textToUpdate: CreateTextDto = {
      text: 'test text'
    };

    controller.updateText(textToUpdate, pw, id);
    expect(textsServiceMock.update).toHaveBeenCalledWith(id, textToUpdate, pw);
  });
});
