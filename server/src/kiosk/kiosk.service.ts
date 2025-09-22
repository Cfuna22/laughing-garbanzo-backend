import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateKioskDto } from './dto/create-kiosk.dto';
import { Kiosks, QueueEntries, Queues } from '../db/schema';
import { and, count, eq, isNull } from 'drizzle-orm';
import { UpdateKioskDto } from './dto/update-kiosk.dto';

@Injectable()
export class KioskService {
  constructor(
    @Inject('DRIZZLE')
    private readonly db: NodePgDatabase<typeof import('../db/schema')>,
  ) {}

  async create(dto: CreateKioskDto) {
    const [kiosk] = await this.db
      .insert(Kiosks)
      .values({
        name: dto.name,
        location: dto.location,
        status: dto.status,
      })
      .returning();
    return kiosk;
  }

  private calculateAverageWaitTime(entries: { joinedAt: Date; servedAt: Date | null }[]) {
    const times = entries
      .filter((e) => e.joinedAt && e.servedAt)
      .map((e) => e.servedAt!.getTime() - e.joinedAt.getTime());

    return times.length
      ? Math.round(times.reduce((a, b) => a + b, 0) / times.length / 60000) // minutes
      : 0;
  }

  async getMetrics(kioskId: string, priority?: 'staff' | 'vip' | 'normal') {
    // total queues in kiosk
    const totalQueues = await this.db
      .select({ count: count() })
      .from(Queues)
      .where(eq(Queues.kioskId, kioskId));

    // active users = entries not yet served
    const totalActiveUsers = await this.db
      .select({ count: count() })
      .from(QueueEntries)
      .innerJoin(Queues, eq(QueueEntries.queueId, Queues.id))
      .where(and(eq(Queues.kioskId, kioskId), isNull(QueueEntries.servedAt)));

    // entries for kiosk (with optional priority filter)
    let conditions = [eq(Queues.kioskId, kioskId)];

    if (priority) {
      conditions.push(eq(QueueEntries.priority, priority));
    }

    const entries = await this.db
      .select({
        id: QueueEntries.id,
        priority: QueueEntries.priority,
        joinedAt: QueueEntries.joinedAt,
        servedAt: QueueEntries.servedAt,
        queue: Queues,
      })
      .from(QueueEntries)
      .leftJoin(Queues, eq(QueueEntries.queueId, Queues.id))
      .where(and(...conditions));

    // group wait times
    const grouped = {
      vip: [] as number[],
      staff: [] as number[],
      normal: [] as number[],
    };

    entries.forEach((e) => {
      if (e.servedAt) {
        const waitMinutes = (e.servedAt.getTime() - e.joinedAt.getTime()) / (1000 * 60);
        grouped[e.priority].push(waitMinutes);
      }
    });

    const avg = (arr: number[]) =>
      arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

    const avgWaitTime = this.calculateAverageWaitTime(entries);

    return {
      kioskId,
      totalQueues: totalQueues[0]?.count ?? 0,
      totalActiveUsers: totalActiveUsers[0]?.count ?? 0,
      averageWaitTime: avgWaitTime,
      totalEntries: entries.length,
      averageWait: {
        vip: avg(grouped.vip),
        staff: avg(grouped.staff),
        normal: avg(grouped.normal),
      },
    };
  }

  async findAll() {
    return this.db.query.Kiosks.findMany();
  }

  async findOne(id: number) {
    return this.db.query.Kiosks.findFirst({
      where: eq(Kiosks.id, id.toString()),
    });
  }

  async update(id: number, dto: UpdateKioskDto) {
    const [updated] = await this.db
      .update(Kiosks)
      .set(dto)
      .where(eq(Kiosks.id, id.toString()))
      .returning();
    return updated;
  }

  async remove(id: number) {
    const [deleted] = await this.db
      .delete(Kiosks)
      .where(eq(Kiosks.id, id.toString()))
      .returning();
    return deleted;
  }
}
