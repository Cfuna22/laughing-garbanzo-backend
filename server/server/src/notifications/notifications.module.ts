import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { DatabaseModule } from 'src/db/database.module';
import { WhatsAppService } from './whatsapp.service';
import { NotificationsResolver } from './types/notifications.resolver';
// import { UssdService } from './ussd.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, WhatsAppService, NotificationsResolver],
  exports: [NotificationsService],
})
export class NotificationsModule {}
