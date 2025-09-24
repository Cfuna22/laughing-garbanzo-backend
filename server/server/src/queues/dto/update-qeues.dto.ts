import { PartialType } from '@nestjs/mapped-types';
import { CreateQueueDto } from './create-qeues.dto';
import { IsInt } from 'class-validator';

export class UpdateQueueDto extends PartialType(CreateQueueDto) {
  // @IsInt(['active', 'paused'])
  @IsInt()
  status: 'active' | 'paused';
}
