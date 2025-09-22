import { IsUUID } from 'class-validator';

export class RejoinQueueDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  queueId: string;
}
