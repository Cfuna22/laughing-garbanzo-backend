import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  supabaseId: string; 

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone?: string;
}
