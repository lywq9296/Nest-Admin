import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import 'dotenv/config';
// import { User } from './modules/user/entities/user.entity';
import { MenuModule } from './modules/menu/menu.module';
import { ContentsModule } from './modules/contents/contents.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.ROOT,
      password: process.env.PASSWORD,
      type: 'mysql',
      // entities: [User],
      database: process.env.DATABASE,
      autoLoadEntities: true, // 替代 entities 属性
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    BookModule,
    MenuModule,
    ContentsModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
