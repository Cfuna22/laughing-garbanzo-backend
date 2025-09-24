import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseJwtVerifier } from './supabase.strategy';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private verifier: SupabaseJwtVerifier) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const auth = req.headers['authorization'] as string | undefined;
    if (!auth || !auth.startsWith('Bearer '))
      throw new UnauthorizedException('Missing token');

    const token = auth.substring('Bearer '.length);
    const payload = await this.verifier.verify(token);

    // Attach to request for downstream use
    req.user = { id: payload.sub, email: payload.email };
    return true;
  }
}
