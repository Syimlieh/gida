import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './modules/token/token.module';
import { CartModule } from './modules/cart/cart.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
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
