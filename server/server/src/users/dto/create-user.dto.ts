import { IsInt, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  supabaseId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
 
  @IsInt()
  @IsOptional()
  phone?: string;

  @IsOptional()
  role?: 'admin' | 'staff' | 'customer';
}
