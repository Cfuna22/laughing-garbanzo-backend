import { IsUUID } from 'class-validator';

export class CancelEntryDto {
  @IsUUID()
  entryId: string;
}
