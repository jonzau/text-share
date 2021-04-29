import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TextDocument } from './schemas/text.schema';
import { Text } from './text-model';

@Injectable()
export class TextsService {
  private readonly texts: Text[] = [  // TODO: remove
    {
      id: '111',
      text: 'text 1'
    },
    {
      id: '222',
      text: 'text 2'
    }
  ];

  constructor(@InjectModel('Text') private readonly textModel: Model<TextDocument>) {}

  async findAll(): Promise<TextDocument[]> {
    return await this.textModel.find();
  }
  
  async findOne(id: string): Promise<TextDocument> {
    const text = await this.textModel.findOne({_id: id});
    if (!text) {
      this.throwNotFoundError();
    }
    return text;
  }

  async create(text: Text): Promise<TextDocument> {
    const newText = new this.textModel(text);
    return await newText.save();
  }
  
  async delete(id: string): Promise<TextDocument> {
    const text =  await this.textModel.findByIdAndRemove(id);
    if (!text) {
      this.throwNotFoundError();
    }
    return text;
  }
  
  async update(id: string, text: Text): Promise<TextDocument> {
    const updatedText = await this.textModel.findByIdAndUpdate(id, text, {new: true});
    if (!updatedText) {
      this.throwNotFoundError();
    }
    return updatedText;
  }

  private throwNotFoundError(errorMsg?: string) {
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: errorMsg || 'Text not found.'
    }, HttpStatus.NOT_FOUND);
  }
}
