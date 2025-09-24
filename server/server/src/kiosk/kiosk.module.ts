import { Module } from '@nestjs/common';
import { KioskService } from './kiosk.service';
import { KioskController } from './kiosk.controller';
import { DatabaseModule } from 'src/db/database.module';
import { KioskResolver } from './kiosk.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [KioskService, KioskResolver],
  controllers: [KioskController],
  exports: [KioskService],
})
export class KioskModule {}
