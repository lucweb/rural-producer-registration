import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Gestão de Produtores Rurais')
    .setDescription(`API modularizada e escalável para gerenciar produtores rurais, propriedades, safras e culturas plantadas. Inclui validações automáticas, dashboard interativo e suporte para grandes volumes de dados.`)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();