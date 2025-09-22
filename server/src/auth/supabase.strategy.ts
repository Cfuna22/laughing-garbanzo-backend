import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify, JWTPayload } from 'jose';
import { SupabaseJwtPayload } from '../common/types/auth';

@Injectable()
export class SupabaseJwtVerifier {
  private jwks = createRemoteJWKSet(new URL(process.env.SUPABASE_JWKS_URL!));

  /**
   * Verifies a Supabase JWT (access token) and returns payload.
   */
  async verify(token: string): Promise<SupabaseJwtPayload> {
    try {
      const { payload } = await jwtVerify(token, this.jwks, {
        issuer: process.env.SUPABASE_URL,
        audience: 'authenticated',
      });
      return payload as SupabaseJwtPayload;
    } catch (e) {
      throw new UnauthorizedException(e, 'Invalid or expired token');
    }
  }
}
