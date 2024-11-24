import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as md5 from 'md5';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findAll(query): Promise<User[]> {
    const { id, username, active } = query;
    let where = '1=1';

    if (id) {
      where += ` AND id='${id}'`;
    }

    if (username) {
      where += ` AND username='${username}'`;
    }

    if (active !== undefined) {
      where += ` AND active=${active}`;
    }

    let { page = 1, pageSize = 20 } = query;
    if (page <= 0) {
      page = 1;
    }
    if (pageSize <= 0) {
      pageSize = 20;
    }

    const sql = `SELECT id, username, avatar, role, nickname, active FROM admin_user ${where} limit ${pageSize} offset ${(page - 1) * pageSize}`;
    return await this.userRepository.query(sql);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.password = md5(createUserDto.password);
    user.role = createUserDto.role;
    user.nickname = createUserDto.nickname || createUserDto.username;
    user.avatar = createUserDto.avatar;
    user.active = 1;

    return this.userRepository.save(user);
  }

  async updateUser(data: CreateUserDto) {
    const { nickname, active, username } = data;

    const sql = [];

    if (nickname) {
      sql.push(`nickname='${nickname}'`);
    }

    if (active !== undefined) {
      sql.push(`active=${active}`);
    }

    return this.userRepository.query(
      `UPDATE admin_user SET ${sql.join(',')} WHERE username=${username}`,
    );
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  getUserInfo() {}
}
