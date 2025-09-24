import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Services } from '../db/schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PaymentsService } from '../payments/payments.service';
import { PaymentProvider } from '../payments/payment.providers';
import { eq } from 'drizzle-orm';

@Injectable()
export class ServicesService {
  constructor(
    @Inject('DRIZZLE')
    private readonly db: NodePgDatabase<typeof import('../db/schema')>,
    private readonly paymentsService: PaymentsService,
  ) {}

  async create(dto: CreateServiceDto) {
    const [service] = await this.db.insert(Services).values(dto).returning();
    return service;
  }

  async purchaseService(userId: string, serviceId: string) {
    const [service] = await this.db
      .select()
      .from(Services)
      .where(eq(Services.id, serviceId));

    if (!service) throw new Error('Service not found');

    return this.paymentsService.create({
      userId,
      serviceId,
      amount: Number(service.price),
      provider: PaymentProvider.FLUTTERWAVE,
      email: 'dummy@example.com',
      phone: Number('08012345678'),
      customerName: 'Test User',
    });
  }

  async findAll() {
    return this.db.query.Services.findMany();
  }

  async findOne(id: string) {
    return this.db.query.Services.findFirst({
      where: eq(Services.id, id),
    });
  }

  async update(id: string, dto: UpdateServiceDto) {
    const [updated] = await this.db
      .update(Services)
      .set(dto)
      .where(eq(Services.id, id))
      .returning();
    return updated;
  }

  async remove(id: string) {
    const [deleted] = await this.db
      .delete(Services)
      .where(eq(Services.id, id))
      .returning();
    return deleted;
  }
}
