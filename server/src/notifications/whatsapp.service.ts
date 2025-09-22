import { Injectable, Logger } from '@nestjs/common';
import Twilio from 'twilio';

@Injectable()
export class WhatsAppService {
  private client: Twilio.Twilio;
  private readonly logger = new Logger(WhatsAppService.name);

  constructor() {
    this.client = Twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!,
    );
  }

  async sendMessage(to: string, message: string) {
    try {
      const result = await this.client.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER!,
        to: `whatsapp:${to}`,
        body: message,
      });

      this.logger.log(`✅ WhatsApp sent to ${to}: ${message}`);
      return result;
    } catch (error) {
      this.logger.error(`❌ Failed to send WhatsApp: ${error.message}`);
      throw error;
    }
  }
}
