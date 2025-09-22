import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { DrizzleService } from '../../db/drizzle.provider';
import { eq } from 'drizzle-orm';
import { Users } from '../../db/schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private db: DrizzleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.get<
      ('admin' | 'staff' | 'customer')[] | undefined
    >(ROLES_KEY, context.getHandler());
    if (!required || required.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const supabaseId = req.user?.id as string | undefined;
    if (!supabaseId) throw new ForbiddenException('No user');

    const [u] = await this.db.db
      .select()
      .from(Users)
      .where(eq(Users.supabaseId, supabaseId));
    if (!u) throw new ForbiddenException('User not provisioned');

    if (!required.includes(u.role as any))
      throw new ForbiddenException('Insufficient role');
    return true;
  }
}
