import { Resolver, Query } from '@nestjs/graphql';
import { AdminService } from '../admin.service';
import { AdminDashboard } from './admin.types';

@Resolver(() => AdminDashboard)
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Query(() => AdminDashboard)
  async getAdminDashboard() {
    return this.adminService.getDashboard();
  }
}
