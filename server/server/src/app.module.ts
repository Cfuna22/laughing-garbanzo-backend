import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { QueuesModule } from './queues/queues.module';
import { QueueEntriesModule } from './queue-entries/queue-entries.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UssdModule } from './notifications/ussd.module';
import { FeedbackModule } from './feedback/feedback.module';
import { KioskModule } from './kiosk/kiosk.module';
// import { KioskResolver } from './kiosk/kiosk.resolver'
import { AiPredictionsModule } from './ai-predictions/ai-predictions.module';
import { AdminModule } from './admin/admin.module';
import { SelfServiceModule } from './self-service/self-service.module';
import { ServicesModule } from './services/services.module';
import { PaymentsModule } from './payments/payments.module';
import { GovernmentModule } from './government/government.module';
import { GovernmentResolver } from './government/government.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      path: '/graphql',
    }),
    AuthModule,
    UsersModule,
    QueuesModule,
    QueueEntriesModule,
    NotificationsModule,
    FeedbackModule,
    KioskModule,
    AiPredictionsModule,
    AdminModule,
    SelfServiceModule,
    ServicesModule,
    PaymentsModule,
    GovernmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, GovernmentResolver],
})
export class AppModule {}
