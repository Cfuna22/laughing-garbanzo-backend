import { Injectable, Inject } from '@nestjs/common';
import { and, eq, sql, isNull, not } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { QueueEntries } from 'src/db/schema';

@Injectable()
export class AiPredictionsService {
  constructor(
    @Inject('DRIZZLE')
    private readonly db: NodePgDatabase<typeof import('../db/schema')>,
  ) {}

  async predictAverageWaitTime(queueId: string) {
    const result = await this.db
      .select({
        averageWaitMinutes: sql<number>`
          AVG(EXTRACT(EPOCH FROM (${QueueEntries.servedAt} - ${QueueEntries.joinedAt})) / 60)::float
        `,
      })
      .from(QueueEntries)
      .where(
        and(
          eq(QueueEntries.queueId, queueId),
          not(isNull(QueueEntries.servedAt))
      )
  );

    return result[0] ?? { averageWaitMinutes: 0 };
  }

  async predictUserWaitTime(queueId: string, currentQueueSize: number) {
    const avgWait = await this.predictAverageWaitTime(queueId);

    return {
      estimatedWaitMinutes: (avgWait.averageWaitMinutes ?? 0) * currentQueueSize,
    };
  }
}
