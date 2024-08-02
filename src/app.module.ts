import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './modules/token/token.module';
import { CartModule } from './modules/cart/cart.module';
import { ProductModule } from './modules/product/product.module';
import { CacheModule } from '@nestjs/cache-manager';
import configuration from './config/config';
import { RedisOptions } from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.registerAsync(RedisOptions),
    AuthModule,
    PrismaModule,
    TokenModule,
    CartModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
