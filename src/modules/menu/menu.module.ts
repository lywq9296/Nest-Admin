import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

@Module({
  imports: [],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
