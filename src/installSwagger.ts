import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default function installSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Nestjs blog api')
    .setDescription('Nestjs blog api description')
    .setVersion('1.0')
    .addTag('Nestjs blog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
}
