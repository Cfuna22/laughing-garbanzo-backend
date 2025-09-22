import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateNotificationDto {
  @IsOptional()
  userId: string;

  @IsNotEmpty()
  @IsEnum(['whatsapp', 'sms', 'email'])
  type: 'whatsapp' | 'sms' | 'email';

  @IsString()
  to: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsString()
  message: string;
}
