import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTextDto } from '@text-share/api-interfaces';
import { TextsService } from "./texts.service";

class TextModelMock {

  static mockReturn: any = null;

  static instance: TextModelMock = null;

  constructor(private dto: CreateTextDto) {
    TextModelMock.instance = this;
  }

  private returnMock(): Promise<any> {
    return TextModelMock.mockReturn ? Promise.resolve(TextModelMock.mockReturn) : Promise.reject();
  }

  save = jest.fn().mockReturnValue(this.returnMock());

  findOne = jest.fn().mockReturnValue(this.returnMock());

  findByIdAndRemove = jest.fn().mockReturnValue(this.returnMock());

  findByIdAndUpdate = jest.fn().mockReturnValue(this.returnMock());
}

describe('TextsService', () => {
  let service: TextsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextsService, 
        {
          provide: getModelToken('Text'),
          useValue: TextModelMock
       }],
    }).compile();

    service = module.get<TextsService>(TextsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create', async () => {
    const id = '123';

    const textToCreate: CreateTextDto = {
      text: 'test text',
      readPassword: '123',
      editPassword: '456'
    };

    const expectedSavedText = {
      _id: id,
      text: 'test text',
      readPassword: '123',
      editPassword: '456'
    };

    TextModelMock.mockReturn = expectedSavedText;
    const savedText = await service.create(textToCreate);
    expect(TextModelMock.instance.save).toHaveBeenCalled();
    expect(savedText.id).toBe(id);
    expect(savedText.text).toBe(textToCreate.text);
    expect(savedText.canEdit).toBe(true);
    expect((service as any).textsCache[id]).toBe(expectedSavedText);
  });
});
