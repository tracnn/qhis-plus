import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException
  } from '@nestjs/common';
  import { catchError, Observable } from 'rxjs';
  import { VALIDATION_MESSAGES } from '../../config/validation-messages.config';
  
  @Injectable()
  export class CustomValidationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        catchError((error) => {
          if (error instanceof BadRequestException && error.getResponse) {
            const response: any = error.getResponse();
            if (response.message && Array.isArray(response.message)) {
              const customMessages = response.message.map((msg: string) =>
                this.overrideMessage(msg)
              );
              throw new BadRequestException(customMessages);
            }
          }
          throw error;
        })
      );
    }
  
    public overrideMessage(msg: string, args?: any): string {
        // Override thông báo lỗi dựa trên nội dung
        if (msg.includes('must be a string')) return VALIDATION_MESSAGES.IS_STRING;
        if (msg.includes('should not be empty')) return VALIDATION_MESSAGES.IS_NOT_EMPTY;
        // Xử lý thông báo lỗi liên quan đến độ dài
        if (msg.includes('must be longer than or equal to') || msg.includes('must be shorter than or equal to')) {
            const minMatch = msg.match(/longer than or equal to (\d+)/);
            const maxMatch = msg.match(/shorter than or equal to (\d+)/);
            const min = minMatch ? parseInt(minMatch[1]) : undefined;
            const max = maxMatch ? parseInt(maxMatch[1]) : undefined;
            
            return VALIDATION_MESSAGES.LENGTH(min, max);
        }
    
        // Xử lý thông báo lỗi liên quan đến mẫu khớp (pattern)
        if (msg.includes('must match')) {
            const patternMatch = msg.match(/\/.*\/[a-z]*/);
            const pattern = patternMatch ? patternMatch[0] : 'Mẫu không xác định';
            return VALIDATION_MESSAGES.MATCHES(pattern);
        }
    
        // Mặc định nếu không khớp
        return `❌ ${msg}`;
    }
  }