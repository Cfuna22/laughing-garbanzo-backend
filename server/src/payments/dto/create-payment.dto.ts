import { IsUUID, IsNumber, IsString, IsOptional } from 'class-validator';
import { PaymentProvider } from '../payment.providers';

export class CreatePaymentDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  serviceId: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  provider?: PaymentProvider;

  @IsOptional()
  @IsString()
  status?: string;

  @IsString()
  email?: string;

  @IsNumber()
  phone?: number;

  @IsString()
  customerName;

  @IsOptional()
  @IsString()
  reference?: string;
}
