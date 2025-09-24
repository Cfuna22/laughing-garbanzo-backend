import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateKioskInput {
  @Field()
  name: string;

  @Field()
  location: string;

  @Field({ nullable: true })
  status?: string;
}

@InputType()
export class UpdateKioskInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  status?: string;
}
