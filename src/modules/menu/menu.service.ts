import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor /* @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>, */() {}

  findAll(): Promise<Menu[]> | any {
    return [];
  }
}
