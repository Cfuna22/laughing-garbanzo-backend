import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {
  @Field()
  email: string;

  @Field()
  role: string;
}

@InputType()
export class UpdateAdminInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  role?: string;
}
