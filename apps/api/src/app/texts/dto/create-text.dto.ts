import { TextInterface } from "@text-share/api-interfaces";

export class CreateTextDto implements TextInterface {
  readonly text: string;
  readonly readPassword: string;
  readonly editPassword: string;
}
