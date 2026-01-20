import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Examen Web 002 API')
    .setDescription('The Examen Web 002 API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const logger = new Logger('Bootstrap');
  await app.listen(process.env.PORT ?? 3000);
  logger.log('Server running on http://localhost:3000');
  logger.log('Swagger running on http://localhost:3000/api');
}
bootstrap();
