import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      type: 'mysql',
      database: process.env.DATABASE,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
