import { IsUUID } from 'class-validator';

export class PredictWaitDto {
  @IsUUID()
  queueId: string;
}
