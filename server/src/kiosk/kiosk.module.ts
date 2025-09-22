import { Module } from '@nestjs/common';
import { KioskService } from './kiosk.service';
import { KioskController } from './kiosk.controller';
import { DatabaseModule } from 'src/db/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [KioskService],
  controllers: [KioskController],
  exports: [KioskService],
})
export class KioskModule {}
