import { Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

type MyResponseObj = {
  statusCode: number;
  path: string;
  error: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseBody: MyResponseObj = {
      error: '',
      statusCode: 500,
      path: request.url,
    };
    if (exception instanceof HttpException) {
      responseBody.statusCode = exception.getStatus();
      responseBody.error = exception.getResponse()['message'];
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2025') {
        responseBody.statusCode = 404;
        responseBody.error = 'Resource not found';
      } else {
        responseBody.error = exception.message;
      }
    } else if (exception instanceof Error) {
      responseBody.error = exception.message;
    } else {
      responseBody.error = 'Internal Server Error';
    }
    response.status(responseBody.statusCode).json(responseBody);
    this.logger.error(responseBody.error);
  }
}
