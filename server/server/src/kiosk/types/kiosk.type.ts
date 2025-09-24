import { ObjectType, InputType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class KioskType {
  @Field(() => ID) 
  id: string;

  @Field() 
  name: string;

  @Field() 
  location: string;

  @Field() 
  status: string;

  @Field() 
  createdAt: Date;
}
