import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentsEntity } from './entities/contents.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentsEntity])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
