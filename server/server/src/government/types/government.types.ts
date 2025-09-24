import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CACResponse {
  @Field()
  companyName: string;

  @Field()
  rcNumber: string;

  @Field()
  status: string;

  @Field()
  registeredAddress: string;
}

@ObjectType()
export class NINResponse {
  @Field()
  fullName: string;

  @Field()
  nin: string;

  @Field()
  dateOfBirth: string;

  @Field()
  gender: string;

  @Field()
  valid: boolean;
}

@ObjectType()
export class TINResponse {
  @Field()
  name: string;

  @Field()
  tin: string;

  @Field()
  taxOffice: string;

  @Field()
  valid: boolean;
}

@ObjectType()
export class PhoneResponse {
  @Field()
  phone: string;

  @Field()
  valid: boolean;

  @Field({ nullable: true })
  carrier?: string;
}
