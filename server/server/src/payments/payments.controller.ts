import { Controller, Get, Post, Body, Param, Patch, Delete, Req, Res, HttpException, HttpStatus } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto);
  }
  
  // Flutterwave webhook endpoint
  @Post('webhook')
  async handleWebhook(@Req() req, @Res() res) {
    try {
      const secretHash = process.env.FLW_SECRET_HASH; // set this in .env
      const signature = req.headers['verif-hash'];

      if (!signature || signature !== secretHash) {
        throw new HttpException('Invalid signature', HttpStatus.FORBIDDEN);
      }

      const event = req.body;

      // 👇 Flutterwave sends event data here
      if (event?.status === 'successful' && event?.data?.tx_ref) {
        await this.paymentsService.markAsSuccessful(
          event.data.id, // flutterwave transaction id
          event.data.tx_ref, // our reference
        );
      } else if (event?.status === 'failed') {
        await this.paymentsService.markAsFailed(event.data.id, 'Payment failed');
      }

      return res.status(200).json({ received: true });
    } catch (err) {
      console.error('Webhook error:', err.message);
      return res.status(400).json({ error: err.message });
    }
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePaymentDto) {
    return this.paymentsService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(id);
  }

  @Patch(":id/success")
  markAsSuccessful(@Param("id") id: string, @Body("reference") reference: string) {
    return this.paymentsService.markAsSuccessful(id, reference);
  }

  @Patch(":id/fail")
  markAsFailed(@Param("id") id: string, @Body("reason") reason: string) {
    return this.paymentsService.markAsFailed(id, reason);
  }
}
