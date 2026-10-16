import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LocationStoreService } from './location_store.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('location-store')
@UseGuards(JwtAuthGuard)
export class LocationStoreController {
  constructor(
    private readonly locationStoreService: LocationStoreService,
  ) {}

  @Post()
  create(
    @Body()
    body: {
      product_id: number;
      store_name: string;
      location: string;
    },
  ) {
    return this.locationStoreService.create(
      body.product_id,
      body.store_name,
      body.location,
    );
  }

  @Post('bulk')
createMany(@Body() locations: any[]) {
  return this.locationStoreService.createMany(locations);
}

  @Get()
  findAll() {
    return this.locationStoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationStoreService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: {
      product_id: number;
      store_name: string;
      location: string;
    },
  ) {
    return this.locationStoreService.update(
      Number(id),
      body.product_id,
      body.store_name,
      body.location,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationStoreService.remove(Number(id));
  }
}