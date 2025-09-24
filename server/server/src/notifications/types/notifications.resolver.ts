import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationsService } from '../notifications.service';
import { Notification } from './notifications.types';
import {
  CreateNotificationInput,
  UpdateNotificationInput,
} from '../dto/notifications.dto';

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Query(() => [Notification])
  async getNotifications() {
    return this.notificationsService.findAll();
  }

  @Query(() => Notification, { nullable: true })
  async getNotification(@Args('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Mutation(() => Notification)
  async createNotification(@Args('data') data: CreateNotificationInput) {
    return this.notificationsService.create(data);
  }

  @Mutation(() => Notification, { nullable: true })
  async updateNotification(
    @Args('id') id: string,
    @Args('data') data: UpdateNotificationInput,
  ) {
    return this.notificationsService.update(+id, data);
  }

  @Mutation(() => Boolean)
  async deleteNotification(@Args('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
