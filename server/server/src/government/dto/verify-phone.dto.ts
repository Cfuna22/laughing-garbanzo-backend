import { IsString, Length } from 'class-validator';

export class VerifyPhoneDto {
  @IsString()
  @Length(10, 15)
  phone: string;
}

