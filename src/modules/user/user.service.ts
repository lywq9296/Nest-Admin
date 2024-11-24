import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as md5 from 'md5';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOneBy({ id });
  }

  async findAll(query): Promise<UserEntity[]> {
    const { id, username, active } = query;
    let where = 'WHERE 1=1';

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

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
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

  findByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ username });
  }

  getUserInfo() {}
}
