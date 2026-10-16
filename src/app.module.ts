import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';
import { BrandModule } from './Brand/brand.module';
import { LocationStoreModule } from './Location_store/location_store.module';
@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProductsModule,
    BrandModule,
    LocationStoreModule,
  ],
})
export class AppModule {}