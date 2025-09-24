import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Payments } from '../db/schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { eq } from 'drizzle-orm';
// import { PaymentProvider } from './payment.providers';
import { UssdService } from '../notifications/ussd.service';
import axios from 'axios';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class PaymentsService {
  private readonly flwSecret: string;
  private readonly flwBaseUrl: string;

  constructor(
    @Inject('DRIZZLE')
    private readonly db: NodePgDatabase<typeof import('../db/schema')>,
    private readonly ussdService: UssdService,
    private readonly notificationsService: NotificationsService,
  ) {
    this.flwSecret = process.env.FLW_SECRET_KEY!;
    this.flwBaseUrl = process.env.FLW_BASE_URL || 'http://api.fluterwave.com';
  }

  async create(dto: CreatePaymentDto) {
    try {
      const payload = {
        tx_ref: `qkiosk_${Date.now()}`,
        amount: dto.amount,
        currency: 'NGN',
        redirect_url: 'http://localhost:5000/payment/callback', // I'll adjust later
        customer: {
          email: dto.email,
          phoneNumber: dto.phone,
          name: dto.customerName,
        },
        payment_options: 'Card, bank transfer, ussd',
      };

      const res = await axios.post(`${this.flwBaseUrl}/payments`, payload, {
        headers: {
          Authorization: `Bearer ${this.flwSecret}`,
        },
      });

      const flwData = res.data;

      const [payment] = await this.db
        .insert(Payments)
        .values({
          userId: dto.userId,
          serviceId: dto.serviceId,
          amount: dto.amount.toString(),
          provider: dto.provider,
          status: 'pending',
          reference: `REF-${Date.now()}`,
        })
        .returning();

      return {
        payment,
        flutterwaveLink: flwData?.data?.link,
      };
    } catch (err) {
      throw new HttpException(
        `payment initiation failed ${err.response?.data?.message || err.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verify(reference: string) {
    try {
      const res = await axios.get(
        `${this.flwBaseUrl}/transactions/verify_by_id_reference?tx_ref=${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.flwSecret}`,
          },
        },
      );

      const data = res.data;

      if (data?.status !== 'success') {
        throw new HttpException('Verification failed', HttpStatus.BAD_REQUEST);
      }

      const [updated] = await this.db
        .update(Payments)
        .set({ status: data.data.status })
        .where(eq(Payments.reference, reference))
        .returning();

      return updated;
    } catch (err) {
      throw new HttpException(
        `Payment verification failed: ${err.response?.data?.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async processPayment(paymentId: string) {
    const payment = await this.db.query.Payments.findFirst({
      where: eq(Payments.id, paymentId),
    });

    if (!payment) throw new Error('Payment not found');

    try {
      // Call USSD/VTU providers
      const result = this.ussdService.executeTransaction(
        payment.serviceId,
        Number(payment.amount),
        payment.userId,
      );

      // Update payment status
      await this.db
        .update(Payments)
        .set({ status: 'success', reference: result.reference })
        .where(eq(Payments.id, paymentId));

      // Send notification
      await this.notificationsService.send({
        userId: payment.userId,
        type: `payment_success', message: 'Payment successful! Ref: ${result.reference}`,
        message: 'Payment successful!',
      });

      return { ...payment, status: 'success', reference: result.reference };
    } catch (err) {
      await this.db
        .update(Payments)
        .set({ status: 'failed' })
        .where(eq(Payments.id, paymentId));

      await this.notificationsService.send({
        userId: payment.userId,
        type: 'payment_failed',
        message: 'Payment failed try again later',
      });

      throw err;
    }
  }

  async findAll() {
    return this.db.query.Payments.findMany();
  }

  async findOne(id: string) {
    return this.db.query.Payments.findFirst({
      where: eq(Payments.id, id),
    });
  }

  async update(id: string, dto: UpdatePaymentDto) {
    const payload: any = {};

    if (dto.userId !== undefined) payload.userId = dto.userId;
    if (dto.serviceId !== undefined) payload.serviceId = dto.serviceId;
    if (dto.amount !== undefined) payload.amount = dto.amount.toString();
    if (dto.provider !== undefined) payload.provider = dto.provider;
    if (dto.status !== undefined) payload.status = dto.status;
    if (dto.reference !== undefined) payload.reference = dto.reference;

    const [updated] = await this.db
      .update(Payments)
      .set(payload)
      .where(eq(Payments.id, id))
      .returning();
    return updated;
  }

  async remove(id: string) {
    const [deleted] = await this.db
      .delete(Payments)
      .where(eq(Payments.id, id))
      .returning();
    return deleted;
  }

  async markAsSuccessful(id: string, reference: string) {
    const [updated] = await this.db
      .update(Payments)
      .set({ status: 'success', reference })
      .where(eq(Payments.id, id))
      .returning();
    return updated;
  }

  async markAsFailed(id: string, reason?: string) {
    const [updated] = await this.db
      .update(Payments)
      .set({ status: 'failed', reference: reason ?? 'FAILED' })
      .where(eq(Payments.id, id))
      .returning();
    return updated;
  }

  async handleWebhook(input: {
    paymentId: string;
    event: string;
    amount: number;
    currency: string;
    reference?: string;
  }) {
    const payment = await this.findOne(input.paymentId);

    if (!payment) {
      throw new Error('Payment not found');
    }

    if (input.event === 'charge.success') {
      payment.status = 'success';
    } else if (input.event === 'charge.failed') {
      payment.status = 'failed';
    } else {
      payment.status = 'unknown';
    }

    //  payment.updatedAt = new Date().toISOString();
    return payment;
  }
}
