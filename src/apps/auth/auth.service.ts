import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(userCredentials: AuthDto) {

        const user = await this.usersService.getUserByEmail(userCredentials.email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(userCredentials.password, user.password);

            if (isPasswordValid) {
                user.password = undefined;
                return user;
            }
        }
        return null;
    }

    async login(authCredentials: AuthDto) {
        const user = await this.validateUser(authCredentials);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayloadDto = {
            email: user.email
        };

        return {
            access_token: this.jwtService.sign(payload)
        };
    }

}
