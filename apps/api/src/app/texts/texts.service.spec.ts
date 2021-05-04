import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TextsService } from "./texts.service";

describe('TextsService', () => {
  let service: TextsService;

  beforeEach(async () => {
    function mockTextModel(dto: any) {
      
      this.data = dto;
      
      this.save  = () => {
        return this.data;
      };

      this.find  = jest.fn();
      
      // this.find  = () => {
      //   return this.data || {};
      // };
      
      this.findOne  = () => {
        return this.data || {};
      };

      this.findByIdAndRemove  = () => {
        return this.data || {};
      };

      this.findByIdAndUpdate  = () => {
        return this.data || {};
      };
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [TextsService, 
        {
          provide: getModelToken('Text'),
          useValue: mockTextModel
       }],
    }).compile();

    service = module.get<TextsService>(TextsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
