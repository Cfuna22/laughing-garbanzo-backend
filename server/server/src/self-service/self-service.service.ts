import { Inject, NotFoundException, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { QueueEntries } from '../db/schema';
import { and, eq } from 'drizzle-orm';
import { CancelEntryDto } from './dto/cancel-queue.dto';
import { RejoinQueueDto } from './dto/rejoin-queue.dto';

@Injectable()
export class SelfServiceService {
  constructor(
    @Inject('DRIZZLE')
    private readonly db: NodePgDatabase<typeof import('../db/schema')>,
  ) {}

  async getMyPosition(userId: string, queueId: string) {
    const entries = await this.db
      .select()
      .from(QueueEntries)
      .where(
        and(
          eq(QueueEntries.queueId, queueId),
          eq(QueueEntries.status, 'waiting'),
        ),
      )
      .orderBy(QueueEntries.joinedAt);

    const position = entries.findIndex((e) => e.userId === userId);
    if (position === -1) {
      throw new NotFoundException('User not in this queue');
    }

    return { position: position + 1, total: entries.length };
  }

  async cancelEntry(dto: CancelEntryDto) {
    const result = await this.db
      .delete(QueueEntries)
      .where(eq(QueueEntries.id, dto.entryId))
      .returning();

    if (!result.length) throw new NotFoundException('Entry not found');
    return { message: 'Queue entry canceled', entry: result[0] };
  }

  async rejoinQueue(dto: RejoinQueueDto) {
    const result = await this.db
      .insert(QueueEntries)
      .values({ userId: dto.userId, queueId: dto.queueId })
      .returning();

    return { message: 'Rejoined queue successfully', entry: result[0] };
  }

  async myHistory(userId: string) {
    return await this.db.select().from(QueueEntries).where(eq(QueueEntries.userId, userId)).orderBy(QueueEntries.joinedAt);
  }
}
