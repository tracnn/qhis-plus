import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

function isArrayOfErrors(data: any): boolean {
    return (
        Array.isArray(data) &&
        data.length > 0 &&
        data.every(
            (err) =>
                err &&
                typeof err === 'object' &&
                typeof err.code === 'string' &&
                typeof err.status === 'number' &&
                err.status >= 400
        )
    );
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const ctx = context.switchToHttp();
                const response = ctx.getResponse();
                const status = data.status || response.statusCode || 200;
                const now = new Date().toISOString();       

                if (isArrayOfErrors(data)) {
                    const allFieldMessages: any[] = [];
                    data.forEach((err: any) => {
                        if (Array.isArray(err.message)) {
                            err.message.forEach((fieldError: any) => {
                                if (fieldError.field) {
                                    allFieldMessages.push({
                                        field: fieldError.field,
                                        message: fieldError.message,
                                    });
                                }
                            });
                        }
                    });

                    // Chọn statusCode lớn nhất (hoặc mặc định 400)
                    const maxStatus = Math.max(...data.map((err: any) => err.status)) || 400;
                    response.statusCode = maxStatus; // Đặt HTTP status code đúng cho response
                    return {
                        data: null,
                        errors: [
                            {
                                code: 'INVALID_INPUT',
                                status: maxStatus,
                                message: allFieldMessages
                            }
                        ],
                        pagination: null,
                        status: maxStatus,
                        message: 'Error',
                        now,
                    };
                }                

                if (data && typeof data === 'object' && 'data' in data && 'pagination' in data) {
                    return {
                        ...data,
                        status: status,
                        message: data.message || 'Success',
                        now,
                    };
                }
                return {
                    data,
                    pagination: null,
                    status: status,
                    message: data.message || 'Success',
                    now,
                };
            }),
        );
    }
} 