import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTextDto, TextDto } from '@text-share/api-interfaces';
import { Model } from 'mongoose';
import { TextDocument } from './schemas/text.schema';

enum ErrorMessages {
  TextNotFound = 'Text not found.',
  PasswordError = 'Password error.',
  WrongPassword = 'Enter the correct password.',
  EnterPassword = 'Enter password.'
}

@Injectable()
export class TextsService {

  private textsCache: {[id: string]: TextDocument} = {};

  constructor(@InjectModel('Text') private readonly textModel: Model<TextDocument>) {}

  // TODO: Remove. For development.
  async findAll(): Promise<TextDocument[]> {
    return await this.textModel.find();
  }

  private hasAccess(text: TextDocument, password?: string): boolean {
    return password === text.editPassword || password === text.readPassword;
  }
  
  private canEdit(text: TextDocument, password?: string): boolean {
    return text.editPassword === password || (!text.editPassword && text.readPassword === password);
  }

  private validateAccess(text: TextDocument, password?: string, edit = true): TextDocument {
    if (this.hasAccess(text, password) && (!edit || this.canEdit(text, password))) {
      return text;
    }
    this.throwPasswordError(password ? ErrorMessages.WrongPassword : ErrorMessages.EnterPassword);
  }

  private validateFound(text: TextDocument): TextDocument {
    if (text) {
      return text;
    }
    this.throwNotFoundError();
  }

  private updateCache(id: string, text: TextDocument | null): void {
    if (id) {
      if (text) {
        this.textsCache[id] = text;
      } else {
        delete this.textsCache[id];
      }
    }
  }
  
  private convertToTextDto(text: TextDocument, password?: string): TextDto {
    return {
      id: text._id,
      text: text.text,
      canEdit: this.canEdit(text, password)
    };
  }

  private async getText(id: string): Promise<TextDocument> {
    let text = this.textsCache[id];
    if (!text) {
      try {
        text = await this.textModel.findOne({_id: id});
        this.updateCache(id, text);
      } catch (err) {
        this.throwNotFoundError(err);
      }
    }
    return this.validateFound(text);
  }

  async findOne(id: string, password?: string): Promise<TextDto> {
    const text = await this.getText(id);
    return this.convertToTextDto(this.validateAccess(text, password, false), password);
  }

  async create(createText: CreateTextDto): Promise<TextDto> {
    const newText = new this.textModel(createText);
    const createdText = await newText.save();
    this.updateCache(createdText._id, createdText)
    return this.convertToTextDto(createdText, createText.editPassword || createText.readPassword);
  }
  
  async delete(id: string, password?: string): Promise<TextDto> {
    const textToDelete = this.validateAccess(await this.getText(id), password, true);
    if (textToDelete) {
      const text = this.validateFound(await this.textModel.findByIdAndRemove(textToDelete._id));
      this.updateCache(text._id, null);
      return this.convertToTextDto(text);
    }
  }
  
  async update(id: string, text: CreateTextDto, password?: string): Promise<TextDto> {
    const textToUpdate = this.validateAccess(await this.getText(id), password, true);
    if (textToUpdate) {
      const updatedText = this.validateFound(await this.textModel.findByIdAndUpdate(textToUpdate._id, text, {new: true}));
      this,this.updateCache(updatedText._id, updatedText);
      return this.convertToTextDto(updatedText, password);
    }
  }

  private throwNotFoundError(errorMsg?: string) {
    throw new HttpException({
      status: HttpStatus.NOT_FOUND,
      error: errorMsg || ErrorMessages.TextNotFound
    }, HttpStatus.NOT_FOUND);
  }
  
  private throwPasswordError(errorMsg?: string) {
    throw new HttpException({
      status: HttpStatus.UNAUTHORIZED,
      error: errorMsg || ErrorMessages.PasswordError
    }, HttpStatus.UNAUTHORIZED);
  } 
}
