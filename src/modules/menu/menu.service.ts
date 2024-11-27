import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  findAll(): Promise<MenuEntity[]> | any {
    // return this.menuRepository.findBy({ active: 1 });

    const QUERY_ALL_SQL = `select * from menus where active = 1 order by id asc`;
    return this.menuRepository.query(QUERY_ALL_SQL);
  }

  async findMenus(id: number) {
    return this.menuRepository.findBy({ id });
  }

  create(createMenuDto: CreateMenuDto) {
    return this.menuRepository.save(createMenuDto);
  }

  update(body: UpdateMenuDto) {
    const id = body?.data?.id || body?.id;
    const data = body?.data || body;

    return this.menuRepository.update(id, data);
  }
}
