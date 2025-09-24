import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { QueuesService } from './queues.service';
import { CreateQueueDto } from './dto/create-qeues.dto';
import { UpdateQueueDto } from './dto/update-qeues.dto';

@Controller('queues')
export class QueuesController {
  constructor(private readonly queueService: QueuesService) {}

  // Get /queues
  @Get()
  findAll() {
    return this.queueService.findAll();
  }

  // Get /queues/:id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.queueService.findOne(id);
  }

  // POST /queues
  @Post()
  create(@Body() dto: CreateQueueDto) {
    return this.queueService.create(dto);
  }

  @Post(':id/serve-next')
  serveNext(@Param('id') id: string) {
    return this.queueService.serveNext(id);
  }

  @Patch('prioritize/:entryId')
  prioritize(@Param('entryId') entryId: string) {
    return this.queueService.prioritizeUser(entryId);
  }

  // PATCH /queues/:id
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateQueueDto) {
    return this.queueService.update(id, dto);
  }

  @Patch(':id/pause')
  pause(@Param('id') id: string) {
    return this.queueService.pauseQueue(id);
  }

  @Patch(':id/resume')
  resume(@Param('id') id: string) {
    return this.queueService.resumeQueue(id);
  }

  // DELETE /queues/:id
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.queueService.remove(id);
  }
}
