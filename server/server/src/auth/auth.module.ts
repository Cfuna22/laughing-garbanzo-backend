import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseJwtVerifier } from './supabase.strategy';
import { DrizzleService } from '../db/drizzle.provider';
import { AuthResolver } from './types/auth.resolver';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SupabaseJwtVerifier, DrizzleService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
