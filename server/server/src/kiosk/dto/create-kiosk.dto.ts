import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateKioskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  status?: string;
}
