import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback } from '../db/schema';
import { eq } from 'drizzle-orm';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @Inject('DRIZZLE')
    private readonly db: NodePgDatabase<typeof import('../db/schema')>,
  ) {}

  async create(dto: CreateFeedbackDto) {
    const [newFeedback] = await this.db
      .insert(Feedback)
      .values({
        userId: dto.userId.toString(),
        queueId: dto.queueId.toString(),
        rating: dto.rating,
        comment: dto.comment ?? null,
      })
      .returning();

    return newFeedback;
  }

  async findAll() {
    return this.db.select().from(Feedback);
  }

  async findOne(id: number) {
    const [item] = await this.db
      .select()
      .from(Feedback)
      .where(eq(Feedback.id, id.toString()));
    if (!item) throw new NotFoundException(`Feedback with ID ${id} not found`);
    return item;
  }

  async update(id: number, dto: UpdateFeedbackDto) {
    const updateData: any = {};

    if (dto.queueId !== undefined) updateData.queueId = dto.queueId;
    if (dto.userId !== undefined) updateData.userId = dto.userId;
    if (dto.rating !== undefined) updateData.rating = dto.rating;
    if (dto.comment !== undefined) updateData.comment = dto.comment;

    const [updated] = await this.db
      .update(Feedback)
      .set(updateData)
      .where(eq(Feedback.id, id.toString()))
      .returning();
    if (!updated) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: number) {
    const [deleted] = await this.db
      .delete(Feedback)
      .where(eq(Feedback.id, id.toString()))
      .returning();
    if (!deleted)
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    return deleted;
  }
}
