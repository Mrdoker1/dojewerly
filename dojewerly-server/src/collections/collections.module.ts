import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from './collections.model';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { ProductModule } from '../products/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ]),
    ProductModule,
  ],
  providers: [CollectionsService],
  controllers: [CollectionsController],
})
export class CollectionsModule {}
