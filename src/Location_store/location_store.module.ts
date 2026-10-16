import { Module } from '@nestjs/common';
import { LocationStoreController } from './location_store.controller';
import { LocationStoreService } from './location_store.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [LocationStoreController],
  providers: [LocationStoreService],
})
export class LocationStoreModule {}