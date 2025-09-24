import { IsString, Length } from 'class-validator';

export class VerifyTinDto {
  @IsString()
  @Length(8, 12, { message: 'TIN must be 8–12 digits' })
  tin: string;
}
