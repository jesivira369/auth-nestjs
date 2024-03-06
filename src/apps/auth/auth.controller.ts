import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('/login')
    async login(@Body() authCredentials: AuthDto) {
        return await this.authService.login(authCredentials);
    }

    @Get('/user')
    @UseGuards(AuthGuard('jwt'))
    async getUser(@Req() request: Request) {
        return request['user'];
    }
    
}
