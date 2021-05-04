export class TextDto {
  readonly id: string;
  readonly text: string;
  readonly canEdit: boolean;
}

export class CreateTextDto {
  readonly text: string;
  readonly readPassword?: string;
  readonly editPassword?: string;
}
