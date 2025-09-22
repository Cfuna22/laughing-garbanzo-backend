import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateQueueEntryDto {
  @IsNotEmpty()
  queueId: string;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsEnum(['vip', 'staff', 'normal'])
  @IsOptional()
  priority?: 'vip' | 'staff' | 'normal' = 'normal';
}
