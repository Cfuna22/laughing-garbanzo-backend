import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateServiceInput } from './create-service.input';

@InputType()
export class UpdateServiceInput extends PartialType(CreateServiceInput) {
  @Field(() => Int)
  id: number;
}
