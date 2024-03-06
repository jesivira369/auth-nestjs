import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayloadDto } from '../../dto/jwt-payload.dto';
import { UsersService } from 'src/apps/users/users.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {

    constructor(
        private configService: ConfigService,
        private usersService: UsersService
        ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('auth.secretKey')
        })
    }

    async validate(payload: JwtPayloadDto){
        
        const user = await this.usersService.getUserByEmail(payload.email);

        if(!user){
            throw new UnauthorizedException('User not found');
        }
        user.password = undefined;
        return user;
    }


}
