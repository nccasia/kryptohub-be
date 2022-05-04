import {INestApplication} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): INestApplication {
    const config = new DocumentBuilder()
        .setTitle('Busker API')
        .setDescription('Busker API description')
        .setVersion('1.0')
        .addTag('staging')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    return app;
}
