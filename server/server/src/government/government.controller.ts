import { Controller, Post, Body } from '@nestjs/common';
import { GovernmentService } from './government.service';
import { VerifyCacDto } from './dto/verify-cac.dto';
import { VerifyNinDto } from './dto/verify-nin.dto';
import { VerifyTinDto } from './dto/verify-tin.dto';
import { VerifyBvnDto } from './dto/verify-bvn.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';

@Controller('government')
export class GovernmentController {
  constructor(private readonly govService: GovernmentService) {}

  @Post('verify-cac')
  verifyCAC(@Body() dto: VerifyCacDto) {
    return this.govService.verifyCAC(dto.cacNumber);
  }

  @Post('verify-nin')
  verifyNIN(@Body() dto: VerifyNinDto) {
    return this.govService.verifyNIN(dto.nin);
  }

  @Post('verify-tin')
  verifyTIN(@Body() dto: VerifyTinDto) {
    return this.govService.verifyTIN(dto.tin);
  }

  @Post('verify-bvn')
  verifyBVN(@Body() dto: VerifyBvnDto) {
    return this.govService.verifyBVN(dto.bvn);
  }

  @Post('verify-phone')
  verifyPhone(@Body() dto: VerifyPhoneDto) {
    return this.govService.verifyPhone(dto.phone);
  }
}
