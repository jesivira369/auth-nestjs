import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'The user data to create a new user',
    type: UserDto,
    examples: {
      aUser: {
        summary: 'A user example',
        value: {
          email: 'user@example.com',
          password: 'stringPassword123',
        },
      },
    },
  })
  @ApiCreatedResponse({ description: 'The user has been successfully created.' })
  @ApiConflictResponse({ description: 'User with the given email already exists.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async createUser(@Body() user: UserDto) {
    return await this.usersService.createUser(user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 200, description: 'List of all users without passwords.' })
  async getUsers() {
    return await this.usersService.getUsers();
  }
}
