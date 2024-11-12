import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guard/auth.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'abcdefg',
      signOptions: { expiresIn: 24 * 60 * 60 + 's' },
    }), // token 的配置
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
