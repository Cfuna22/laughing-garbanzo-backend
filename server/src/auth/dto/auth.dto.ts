import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStaffOrAdminInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  name: string;

  @Field()
  role: 'staff' | 'admin';
}
