import { IsString, Length } from 'class-validator';

export class VerifyCacDto {
  @IsString()
  @Length(6, 20)
  cacNumber: string;
}
