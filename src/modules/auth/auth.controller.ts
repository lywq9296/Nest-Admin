import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { wrapperResponse } from 'src/utils/response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  login(@Body() params) {
    return wrapperResponse(
      this.authService.login(params.username, params.password),
      '登录成功',
    );
  }
}
