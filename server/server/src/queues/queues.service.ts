import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, asc, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { QueueEntries, Queues } from '../db/schema';
import { CreateQueueDto } from './dto/create-qeues.dto';
import { UpdateQueueDto } from './dto/update-qeues.dto';

@Injectable()
export class QueuesService {
  constructor(
    @Inject('DRIZZLE')
    private readonly db: NodePgDatabase<typeof import('../db/schema')>,
  ) {}
    private queues: Record<string, string[]> = {};

  async findAll() {
    return this.db.select().from(Queues);
  }

  async findOne(id: number) {
    const queue = await this.db.query.Queues.findFirst({
      where: eq(Queues.id, id.toString()),
    });

    if (!queue) throw new NotFoundException('Queue not found');
    return queue;
  }

  async pauseQueue(queueId: string) {
    return this.db
      .update(Queues)
      .set({ status: 'paused' })
      .where(eq(Queues.id, queueId))
      .returning();
  }

  async resumeQueue(queueId: string) {
    return this.db
      .update(Queues)
      .set({ status: 'active' })
      .where(eq(Queues.id, queueId))
      .returning();
  }

  async serveNext(queueId: string) {
    const nextEntry = await this.db
      .select()
      .from(QueueEntries)
      .where(
        and(
          eq(QueueEntries.queueId, queueId),
          eq(QueueEntries.status, 'waiting'),
        ),
      )
      .orderBy(asc(QueueEntries.joinedAt))
      .limit(1);

    if (!nextEntry[0]) return null;

    await this.db
      .update(QueueEntries)
      .set({ status: 'served', servedAt: new Date() })
      .where(eq(QueueEntries.id, nextEntry[0].id));

    return nextEntry[0];
  }

  async prioritizeUser(entryId: string) {
    return this.db
      .update(QueueEntries)
      .set({ joinedAt: new Date() })
      .where(eq(QueueEntries.id, entryId))
      .returning();
  }

  async create(dto: CreateQueueDto) {
    const [newQueue] = await this.db.insert(Queues).values(dto).returning();

    return newQueue;
  }

  async update(id: number, dto: UpdateQueueDto) {
    const [updated] = await this.db
      .update(Queues)
      .set(dto)
      .where(eq(Queues.id, id.toString()))
      .returning();

    if (!updated) throw new NotFoundException('Queue not found');
    return updated;
  }

  async remove(id: number) {
    const [deleted] = await this.db
      .delete(Queues)
      .where(eq(Queues.id, id.toString()))
      .returning();

    if (!deleted) {
      throw new NotFoundException(`Queue with ID ${id} not found`);
    }
    return deleted;
  }

  async joinQueue(queueId: string, userId: string) {
    if (!this.queues[queueId]) {
      this.queues[queueId] = [];
    }

    // Check if user already in queue
    if (this.queues[queueId].includes(userId)) {
      return { success: false, message: 'User already in queue' };
    }

    // Add user
    this.queues[queueId].push(userId);

    return {
      success: true,
      queueId,
      userId,
      position: this.queues[queueId].length,
    };
  }
}
