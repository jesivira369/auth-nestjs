import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'The user has been successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ 
    type: AuthDto,
    description: 'The email and password of the user to login with',
    examples: {
        example: {
            value: {
                email: 'john@gmail.com',
                password: 'password',
            }
        }
    }
 })
  async login(@Body() authCredentials: AuthDto) {
    return await this.authService.login(authCredentials);
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, description: 'The current user has been successfully retrieved.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getUser(@Req() request: Request) {
    return request['user'];
  }
}
