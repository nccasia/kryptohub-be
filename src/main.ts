import {NestFactory} from '@nestjs/core';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';
import {setupAuth} from './setup-auth';
import {setupSwagger} from './setup-swagger';
import { ValidationPipe } from '@nestjs/common';
import { setupValidation } from './setup-validation';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(compression());

    setupValidation(app);
    setupAuth(app);

    if (process.env.API_DOCS) {
        setupSwagger(app);
    }

    await app.listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0');
}
bootstrap();
