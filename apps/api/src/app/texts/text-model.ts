import { TextInterface } from '@text-share/api-interfaces';

export class Text implements TextInterface {
  id?: string;
  text: string;
  readPassword?: string;
  editPassword?: string;
}