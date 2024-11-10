import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id) {
    console.log(typeof id);

    return 'get user: ' + id;
  }
}
