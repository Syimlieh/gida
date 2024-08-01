import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FormatResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const oldSend = res.send;
    res.send = function (data: any): Response {
      let parsedData: any;
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        parsedData = data;
      }

      const formattedResponse = {
        statusCode: res.statusCode,
        success: res.statusCode >= 200 && res.statusCode < 300,
        data: parsedData,
      };

      return oldSend.call(this, JSON.stringify(formattedResponse));
    };

    next();
  }
}
