import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('PRUEBA TECNICA')
    .setDescription(
      'Esta es una API para la prueba técnica, soy orlando seoanes',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(3000);
  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(`Swagger is running on: ${await app.getUrl()}/api/docs`);
}
bootstrap();
