import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateQueueDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsUUID()
  createBy?: string;

  @IsUUID()
  @IsNotEmpty()
  kioskId: string;

  @IsOptional()
  @IsString()
  description?: string;
}
