import { Controller, Post, Body } from '@nestjs/common';
import { UssdService } from './ussd.service';

@Controller('ussd')
export class UssdController {
  constructor(private readonly ussdService: UssdService) {}

  @Post()
  handleUssd(@Body() body: any) {
    return this.ussdService.handleRequest(body);
  }
}
