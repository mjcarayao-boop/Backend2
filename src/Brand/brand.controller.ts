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
import { BrandService } from './brand.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('brand')
@UseGuards(JwtAuthGuard)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
create(
  @Body()
  body: {
    product_id: number;
    brand_name: string;
  },
) {
  return this.brandService.create(
    body.product_id,
    body.brand_name,
  );
}
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: {
      product_id: number;
      brand_name: string;
    },
  ) {
    return this.brandService.update(
      Number(id),
      body.product_id,
      body.brand_name,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(Number(id));
  }

  @Post('bulk')
createMany(@Body() brands: any[]) {
  return this.brandService.createMany(brands);
}
}