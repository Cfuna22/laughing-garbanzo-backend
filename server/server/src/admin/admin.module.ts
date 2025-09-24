import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseModule } from 'src/db/database.module';
import { AdminResolver } from './types/admin.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [AdminService, AdminResolver],
  controllers: [AdminController],
})
export class AdminModule {}
