import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthUser } from '../common/decorators/user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  // Admin endpoint to create STAFF/ADMIN accounts
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post('/staff')
  async createStaff(
    @Body()
    body: {
      email: string;
      password: string;
      name: string;
      role: 'staff' | 'admin';
    },
  ) {
    return this.auth.createStaffOrAdmin(body);
  }

  // Ensure local profile exists for current user and fetch it
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@AuthUser() user: { id: string; email?: string }) {
    const profile = await this.auth.ensureUser(user.id, user.email);
    return profile;
  }
}
