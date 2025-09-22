import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseJwtVerifier } from './supabase.strategy';
import { DrizzleService } from '../db/drizzle.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SupabaseJwtVerifier, DrizzleService],
  exports: [AuthService],
})
export class AuthModule {}
