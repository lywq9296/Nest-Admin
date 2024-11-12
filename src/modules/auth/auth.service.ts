import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  @Inject()
  private userService: UserService;

  async login(username) {
    const user = await this.userService.findByUsername(username);
    return user;
  }
}
