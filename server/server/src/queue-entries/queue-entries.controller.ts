import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { QueueEntriesService } from './queue-entries.service';
import { CreateQueueEntryDto } from './dto/create-queue-entries.dto';
import { UpdateQueueEntryDto } from './dto/update-queue-entries.dto';

@Controller('queue-entries')
export class QueueEntriesController {
  constructor(private readonly service: QueueEntriesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateQueueEntryDto) {
    return this.service.create(dto);
  }

  @Post(':queueId/join')
  joinQueue(
    @Param('queueId') queueId: string,
    @Body() body: { userId: string; priority?: 'vip' | 'staff' | 'normal' },
  ) {
    return this.service.joinQueue(queueId, body.userId, body.priority);
  }

  @Post(':queueId/next')
  getNext(@Param('queueId') queueId: string) {
    return this.service.getNext(queueId);
  }

  @Patch(':queueId/pause')
  pauseQueue(@Param('queueId') queueId: string) {
    return this.service.pauseQueue(queueId);
  }

  @Patch(':queueId/resume')
  resumeQueue(@Param('queueId') queueId: string) {
    return this.service.resumeQueue(queueId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateQueueEntryDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
