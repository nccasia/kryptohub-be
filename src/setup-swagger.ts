import {INestApplication} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): INestApplication {
    const config = new DocumentBuilder()
        .setTitle('Kryptohub API')
        .setDescription('Kryptohub API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    return app;
}
