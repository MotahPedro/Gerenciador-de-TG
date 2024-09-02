import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Gerenciador')
    .setDescription(
      'Ambiente Swagger UI gerado com sucesso',
    )
    .setVersion('1.0')
    // .addOAuth2(
    //   {
    //     type: 'oauth2',
    //     flows: {
    //       clientCredentials: {
    //         tokenUrl: process.env.COGNITO_AUTH,
    //         scopes: {},
    //       },
    //     },
    //   },
    //   'oauth2',
    // )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('gerenciadorDeTG/v1/api', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on port: ${await app.getUrl()}`);
}
bootstrap();
