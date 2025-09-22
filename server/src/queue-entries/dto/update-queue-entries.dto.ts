import { PartialType } from '@nestjs/mapped-types';
import { CreateQueueEntryDto } from './create-queue-entries.dto';

export class UpdateQueueEntryDto extends PartialType(CreateQueueEntryDto) {}
