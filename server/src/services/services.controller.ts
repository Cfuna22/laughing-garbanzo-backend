// src/services/services.controller.ts
import { Controller, Get, Post, Body, Param, Patch, Delete } from "@nestjs/common";
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateServiceDto) {
    return this.servicesService.update(id, dto);
  }
  
  @Post(':id/purchase')
  async purchase(@Param('id') serviceId: string, @Body() userId: string) {
    return this.servicesService.purchaseService(userId, serviceId);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.servicesService.remove(id);
  }
}
