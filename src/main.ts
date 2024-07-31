import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatResponseMiddleware } from './middleware/format-response.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Gida API')
    .setDescription('Backend application for Gida Application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: { docExpansion: 'none' },
  });

  // format response middleware
  app.use(new FormatResponseMiddleware().use);

  await app.listen(3000);
}
bootstrap();
