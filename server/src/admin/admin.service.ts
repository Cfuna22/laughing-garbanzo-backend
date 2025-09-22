import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { count, gte } from 'drizzle-orm';
import { Users, Kiosks, Queues, QueueEntries } from '../db/schema';

@Injectable()
export class AdminService {
  constructor(
    @Inject('DRIZZLE')
    private readonly db: NodePgDatabase<typeof import('../db/schema')>,
  ) {}

  async getDashboard() {
    const [UserCount] = await this.db.select({ count: count() }).from(Users);
    const [kioskCount] = await this.db.select({ count: count() }).from(Kiosks);
    const [queueCount] = await this.db.select({ count: count() }).from(Queues);
    const [entryCount] = await this.db
      .select({ count: count() })
      .from(QueueEntries);

    // Today's date (start today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // New users today
    const [newUsersToday] = await this.db
      .select({ count: count() })
      .from(Users)
      .where(gte(Users.createdAt, today));

    // New queue entries today
    const [newEntriesToday] = await this.db
      .select({ count: count() })
      .from(QueueEntries)
      .where(gte(QueueEntries.joinedAt, today));

    return {
      totals: {
        totalUsers: UserCount.count,
        totalKiosks: kioskCount.count,
        totalQueues: queueCount.count,
        totalQueueEntries: entryCount.count,
      },
      today: {
        newUser: newUsersToday.count,
        newQueueEntries: newEntriesToday.count,
      },
    };
  }
}
