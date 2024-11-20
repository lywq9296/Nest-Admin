import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/updata-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  findAll(): Promise<Menu[]> | any {
    // return this.menuRepository.findBy({ active: 1 });

    const QUERY_ALL_SQL = `select * from menu where active = 1 order by id asc`;
    return this.menuRepository.query(QUERY_ALL_SQL);
  }

  create(createMenuDto: CreateMenuDto) {
    console.log(createMenuDto);

    return this.menuRepository.save(createMenuDto);
  }

  update(body: UpdateMenuDto) {
    const id = body?.data?.id || body?.id;
    const data = body?.data || body;

    return this.menuRepository.update(id, data);
  }
}
