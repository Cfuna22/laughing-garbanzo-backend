import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { QueueEntries } from '../db/schema';
import { eq, sql, and } from 'drizzle-orm';
import { CreateQueueEntryDto } from './dto/create-queue-entries.dto';
import { UpdateQueueEntryDto } from './dto/update-queue-entries.dto';

@Injectable()
export class QueueEntriesService {
  constructor(
    @Inject('DRIZZLE')
    private readonly db: NodePgDatabase<typeof import('../db/schema')>,
  ) {}

  async findAll() {
    return this.db.query.QueueEntries.findMany();
  }

  async joinQueue(
    queueId: string,
    userId: string,
    priority: 'vip' | 'staff' | 'normal' = 'normal',
  ) {
    const [entry] = await this.db
      .insert(QueueEntries)
      .values({ queueId, userId, priority })
      .returning();

    return entry;
  }

  async findAllByQueue(queueId: string) {
    return this.db
      .select()
      .from(QueueEntries)
      .where(eq(QueueEntries.queueId, queueId))
      .orderBy(
        sql`CASE
          WHEN ${QueueEntries.priority} = 'vip' THEN 1 
          WHEN ${QueueEntries.priority} = 'staff' THEN 2 
          ELSE 3 
        END`,
        QueueEntries.joinedAt,
      );
  }

  async getNext(queueId: string) {
    const [next] = await this.db
      .select()
      .from(QueueEntries)
      .where(eq(QueueEntries.queueId, queueId))
      .orderBy(
        sql`CASE
          WHEN ${QueueEntries.priority} = 'vip' THEN 1 
          WHEN ${QueueEntries.priority} = 'staff' THEN 2 
          ELSE 3 
        END`,
        QueueEntries.joinedAt,
      )
      .limit(1);

    if (!next) return null;

    await this.db
      .update(QueueEntries)
      .set({ status: 'served', servedAt: new Date() })
      .where(eq(QueueEntries.queueId, next.id));
  }

  async pauseQueue(queueId: string) {
    return await this.db
      .update(QueueEntries)
      .set({ status: 'paused' })
      .where(eq(QueueEntries.queueId, queueId));
  }

  // Resume a queue
  async resumeQueue(queueId: string) {
    return await this.db
      .update(QueueEntries)
      .set({ status: 'waiting' })
      .where(
        and(
          eq(QueueEntries.queueId, queueId),
          eq(QueueEntries.status, 'paused'),
        ),
      );
  }

  async findOne(id: number) {
    const entry = await this.db.query.QueueEntries.findFirst({
      where: eq(QueueEntries.id, id.toString()),
    });

    if (!entry) throw new NotFoundException('Queue entry not found');
    return entry;
  }

  async create(dto: CreateQueueEntryDto) {
    const [newEntry] = await this.db
      .insert(QueueEntries)
      .values({ queueId: dto.queueId, userId: dto.userId, status: dto.status })
      .returning();

    return newEntry;
  }

  async update(id: number, dto: UpdateQueueEntryDto) {
    const [updated] = await this.db
      .update(QueueEntries)
      .set(dto)
      .where(eq(QueueEntries.id, id.toString()))
      .returning();

    if (!updated) throw new NotFoundException('Queue entry not found');
    return updated;
  }

  async remove(id: number) {
    const [deleted] = await this.db
      .delete(QueueEntries)
      .where(eq(QueueEntries.id, id.toString()))
      .returning();

    if (!deleted) throw new NotFoundException('Queue entry not found');
    return deleted;
  }
}
