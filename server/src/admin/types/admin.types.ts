import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminTotals {
  @Field(() => Int)
  totalUsers: number;

  @Field(() => Int)
  totalKiosks: number;

  @Field(() => Int)
  totalQueues: number;

  @Field(() => Int)
  totalQueueEntries: number;
}

@ObjectType()
export class AdminTodayStats {
  @Field(() => Int)
  newUser: number;

  @Field(() => Int)
  newQueueEntries: number;
}

@ObjectType()
export class AdminDashboard {
  @Field(() => AdminTotals)
  totals: AdminTotals;

  @Field(() => AdminTodayStats)
  today: AdminTodayStats;
}
