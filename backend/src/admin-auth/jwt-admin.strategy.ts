import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { USER_TYPE } from '../constant/common.constant';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_ADMIN_SECRET') || '',
        });
    }

    async validate(payload: any) {
        return { 
            userId: payload.sub, 
            username: payload.username,
            type: USER_TYPE.STAFF,
            fullname: payload.fullname,
            email: payload.email,
        };
    }
} 