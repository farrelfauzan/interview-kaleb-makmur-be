import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function (app: INestApplication) {
  const config = app.get(ConfigService);

  const swaggerDocs = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription("Please report if there's issue")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocs);

  SwaggerModule.setup('api', app, document, {
    customCss: '.topbar { display: none !important; }',
    customSiteTitle: 'API Documentation',
    swaggerOptions: {
      docExpansion: 'none',
    },
  });
}
