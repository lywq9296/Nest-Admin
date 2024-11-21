import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  /* constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {} */

  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  async login(username, password) {
    const user = await this.userService.findByUsername(username);
    const md5Password = md5(password).toUpperCase();

    if (user.password.toUpperCase() !== md5Password) {
      throw new UnauthorizedException();
    }

    const payload = { username, userid: user.id };
    return { token: await this.jwtService.sign(payload) };
  }
}
