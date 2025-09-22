import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Notifications, Users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { WhatsAppService } from './whatsapp.service';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('DRIZZLE')
    private readonly db: NodePgDatabase<typeof import('../db/schema')>,
    private readonly whatsappService: WhatsAppService,
  ) {}

  async findAll() {
    return this.db.query.Notifications.findMany();
  }

  async findOne(id: number) {
    const notification = await this.db.query.Notifications.findFirst({
      where: eq(Notifications.id, id.toString()),
    });

    if (!notification) throw new NotFoundException('Notification not found');
    return notification;
  }

  async create(dto: CreateNotificationDto) {
    const [newNotification] = await this.db
      .insert(Notifications)
      .values({
        userId: dto.userId ?? null,
        type: dto.type,
        status: dto.status ?? 'pending',
      })
      .returning();

    if (dto.type === 'whatsapp') {
      await this.whatsappService.sendMessage(dto.to, dto.message);
    }

    return newNotification;
  }

  async update(id: number, dto: UpdateNotificationDto) {
    const [updated] = await this.db
      .update(Notifications)
      .set(dto)
      .where(eq(Notifications.id, id.toString()))
      .returning();

    if (!updated) throw new NotFoundException('Notification not found');
    return updated;
  }

  async remove(id: number) {
    const [deleted] = await this.db
      .delete(Notifications)
      .where(eq(Notifications.id, id.toString()))
      .returning();

    if (!deleted) throw new NotFoundException('Notification not found');
    return deleted;
  }

  async send({
    userId,
    type,
    message,
  }: {
    userId: string;
    type: string;
    message?: string;
  }) {
    const user = await this.db.query.Users.findFirst({
      where: eq(Users.id, userId),
    });

    if (!user) return;

    // Mock though
    console.log(`SMS to ${user.phone}: ${message}`);
    console.log(`Email to ${user.email}: ${message}`);
  }
}
