import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field()
  to: string;

  @Field()
  message: string;

  @Field(() => String)
  type: 'email' | 'whatsapp' | 'sms';

  @Field({ nullable: true })
  userId: string;
}

@InputType()
export class UpdateNotificationInput {
  @Field({ nullable: true })
  to?: string;

  @Field({ nullable: true })
  message?: string;

  @Field(() => String, { nullable: true })
  type?: 'email' | 'whatsapp' | 'sms';

  @Field({ nullable: true })
  userId: string;
}
