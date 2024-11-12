import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { error, success } from 'src/utils/login';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  login(@Body() params) {
    return this.authService
      .login(params.username, params.password)
      .then((data) => success(data, '登录成功'))
      .catch((err) => error(err.message));
  }
}
