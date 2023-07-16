import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/user.controller';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './products/product.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { CollectionsModule } from './collections/collections.module';
import { FavouritesModule } from './favourites/favourites.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ProductModule,
    CollectionsModule,
    FavouritesModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
