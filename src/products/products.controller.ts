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
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
      code: string;
      price: number;
      description?: string;
    },
  ) {
    return this.productsService.create(
      body.name,
      body.code,
      body.price,
      body.description,
    );
  }

  @Post('bulk')
  createMany(
    @Body()
    products: {
      name: string;
      code: string;
      price: number;
      description?: string;
    }[],
  ) {
    return this.productsService.createMany(products);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
 @Get('all-details')
findAllWithDetails() {
  return this.productsService.findAllWithDetails();
}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: {
      name: string;
      code: string;
      price: number;
      description?: string;
    },
  ) {
    return this.productsService.update(
      Number(id),
      body.name,
      body.code,
      body.price,
      body.description,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }
  
}