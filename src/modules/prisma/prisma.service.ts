import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

let connections = 0;
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      connections += 1;
      this.logger.verbose(`Connected to the database: ${connections} counts`);
    } catch (error) {
      this.logger.error('Error connecting to the database:', error);
      process.exit(1); // Exit the process or handle the error as needed
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.debug('Disconnected from the database');
    } catch (error) {
      this.logger.error('Error disconnecting from the database:', error);
    }
  }
}
