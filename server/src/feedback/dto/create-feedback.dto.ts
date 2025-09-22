import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateFeedbackDto {
  @IsUUID()
  userId: string;

  @Type(() => Number)
  @IsInt()
  queueId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
