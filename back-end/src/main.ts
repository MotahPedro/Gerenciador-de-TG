import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  if (!process.env.COOKIE_SECRET) {
    throw new Error('COOKIE_SECRET is not defined');
  }
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // Configurar CORS
  const allowedOrigins = ['http://127.0.0.1:5500', 'http://localhost:3000'];

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir requisições sem origem (exemplo: Postman ou cURL)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Gerenciador')
    .setDescription(
      'Ambiente Swagger UI gerado com sucesso',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('gerenciadorDeTG/v1/api', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on port: ${await app.getUrl()}`);
}
bootstrap();
