import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { KioskService } from './kiosk.service';
import { CreateKioskDto } from './dto/create-kiosk.dto';
import { UpdateKioskDto } from './dto/update-kiosk.dto';

@Controller('kiosk')
export class KioskController {
  constructor(private readonly kioskService: KioskService) {}

  @Post()
  create(@Body() dto: CreateKioskDto) {
    return this.kioskService.create(dto);
  }

  @Get()
  findAll() {
    return this.kioskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kioskService.findOne(+id);
  }

  @Get(':id/metrics')
  getMetrics(
    @Param('id') id: string,
    @Query('priority') priority?: string,
  ) {
    const validPriority = ['staff', 'vip', 'normal'] as const;
    return this.kioskService.getMetrics(
      id,
      validPriority.includes(priority as any)
      ? (priority as 'staff' | 'vip' | 'normal')
      : undefined,
    );
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateKioskDto) {
    return this.kioskService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kioskService.remove(+id);
  }
}
