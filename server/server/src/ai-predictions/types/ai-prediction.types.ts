import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AverageWaitTime {
  @Field(() => Float)
  averageWaitMinutes: number;
}

@ObjectType()
export class UserWaitTime {
  @Field(() => Float)
  estimatedWaitMinutes: number;
}
