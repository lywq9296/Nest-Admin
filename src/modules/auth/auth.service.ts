import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as md5 from 'md5';
@Injectable()
export class AuthService {
  @Inject()
  private userService: UserService;

  async login(username, password) {
    const user = await this.userService.findByUsername(username);
    const md5Password = md5(password).toUpperCase();

    if (user.password !== md5Password) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
