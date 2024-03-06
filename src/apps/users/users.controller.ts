import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() user: UserDto) {
    return await this.usersService.createUser(user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUsers() {
    return await this.usersService.getUsers();
  }
}
