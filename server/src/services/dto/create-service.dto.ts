import { IsString, IsUUID, IsOptional, IsBoolean } from "class-validator";

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  price?: string;

  @IsUUID()
  kioskId: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
 
  type: "airtime" | "data" | "bill";
  provider: string;
  amount: number;
}
