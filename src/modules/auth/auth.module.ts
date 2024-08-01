import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from '../token/token.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from 'src/guards';
import { AtStrategy, RtStrategy } from 'src/strategies';

@Module({
  imports: [TokenModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    AtStrategy,
    RtStrategy,
  ],
})
export class AuthModule {}
