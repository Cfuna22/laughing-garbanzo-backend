import { Injectable, BadRequestException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { DrizzleService } from '../db/drizzle.provider';
import { Users } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  private admin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  constructor(private db: DrizzleService) {}

  /**
   * Idempotent provisioning: ensure a local profile row exists for a Supabase user.
   */
  async ensureUser(supabaseId: string, email?: string, name?: string) {
    const existing = await this.db.db
      .select()
      .from(Users)
      .where(eq(Users.supabaseId, supabaseId));
    if (existing.length > 0) return existing[0];
    const [inserted] = await this.db.db
      .insert(Users)
      .values({ supabaseId, email: email ?? '', name: name ?? 'User' })
      .returning();
    return inserted;
  }

  /**
   * Admin-only: create a STAFF or ADMIN account via Supabase Admin API, then provision profile.
   */
  async createStaffOrAdmin(payload: {
    email: string;
    password: string;
    name: string;
    role: 'staff' | 'admin';
  }) {
    // 1) Create user in Supabase Auth (email+password)
    const { data, error } = await this.admin.auth.admin.createUser({
      email: payload.email,
      password: payload.password,
      email_confirm: true,
      user_metadata: { name: payload.name },
    });
    if (error || !data.user)
      throw new BadRequestException(error?.message || 'Failed to create user');

    // 2) Upsert local profile with role
    const [inserted] = await this.db.db
      .insert(Users)
      .values({
        supabaseId: data.user.id,
        email: payload.email,
        name: payload.name,
        role: payload.role,
      })
      .onConflictDoUpdate({
        target: Users.supabaseId,
        set: { email: payload.email, name: payload.name, role: payload.role },
      })
      .returning();

    return { supabaseId: data.user.id, profile: inserted };
  }

  /** Fetch current user's profile (from local Users table). */
  async me(supabaseId: string) {
    const [u] = await this.db.db
      .select()
      .from(Users)
      .where(eq(Users.supabaseId, supabaseId));
    return u ?? null;
  }
}
