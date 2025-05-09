import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    console.log(exceptionResponse);
    // If the exception response already has our custom format, return it directly
    if (exceptionResponse && exceptionResponse.error === 'ValidationError') {
      return response.status(status).json(exceptionResponse);
    }

    // Otherwise, format the error response
    const errorResponse = {
      statusCode: status,
      error: 'ValidationError',
      details: Array.isArray(exceptionResponse) 
        ? exceptionResponse.map(error => ({
            field: error.property,
            messages: Object.values(error.constraints || {}),
            value: error.value
          }))
        : [{
            field: 'general',
            messages: [exceptionResponse.message || 'Lỗi không xác định'],
            value: null
          }]
    };

    response.status(status).json(errorResponse);
  }
} 