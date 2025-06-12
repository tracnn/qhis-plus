import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { USER_TYPE } from '../constant/common.constant';

@Injectable()
export class JwtAdminAuthGuard extends AuthGuard('jwt-admin') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        // Kiểm tra nếu đang trong môi trường test hoặc dev
        if (process.env.ENABLE_JWT_GUARD === 'false') {
            return true;
        }

        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        // Xử lý lỗi và kiểm tra user
        if (err || !user) {
            throw err || new UnauthorizedException('Unauthorized');
        }

        // Kiểm tra role admin
        if (user.type !== USER_TYPE.STAFF) {
            throw new UnauthorizedException('Access denied. Admin role required.');
        }

        return user;
    }
} 