import { Injectable } from '@nestjs/common';

@Injectable()
export class UssdService {
  sendUssd(userId: string, message: string) {
    console.log(`USSD to user ${userId}: ${message}`);
    return { success: true, message: 'USSD sent' };
  }

  executeTransaction(serviceId: string, amount: number, userId: string) {
    console.log(
      `USSD transaction => ${serviceId}, amount: ${amount}, user: ${userId}`,
    );

    // mock
    return {
      reference: `TX-${Date.now()}`,
      status: 'success',
    };
  }

  async handleRequest(body: any) {
    const { sessionId, phoneNumber, text } = body;

    let response = '';

    // Split USSD text input into steps (e.g., "1*2")
    const steps = text.split('*');

    if (text === '') {
      // First dial
      response = 'CON Welcome to Qatalyst\n1. Check Queue\n2. Make Payment';
    } else if (steps[0] === '1') {
      // Queue options
      if (steps.length === 1) {
        response = 'CON Queue Options\n1. View My Queue\n2. Join Queue';
      } else if (steps[1] === '1') {
        response = 'END Your current queue number is 15. Please wait...';
      } else if (steps[1] === '2') {
        response = 'END You have been added to the queue. Your number is 16.';
      }
    } else if (steps[0] === '2') {
      // Payment options
      if (steps.length === 1) {
        response = 'CON Payments\n1. Airtime\n2. Data';
      } else if (steps[1] === '1') {
        response = 'END You bought Airtime successfully!';
      } else if (steps[1] === '2') {
        response = 'END You bought Data successfully!';
      }
    } else {
      response = 'END Invalid choice. Try again.';
    }

    return response;
  }
}
