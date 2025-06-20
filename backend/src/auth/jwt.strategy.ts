import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { USER_TYPE } from '../constant/common.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || '',
        });
    }

    async validate(payload: any) {
        // payload: { sub: userId, username, ... }
        return { 
            userId: payload.sub, 
            username: payload.username, 
            type: USER_TYPE.USER,
            identityNumber: payload.identityNumber, 
            insuranceNumber: payload.insuranceNumber 
        };
    }
} 